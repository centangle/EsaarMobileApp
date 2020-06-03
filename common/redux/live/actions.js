import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import {recievedChanges,userConnected,userDisconnected,youConnected,youDisconnected} from '../user/user.actions';
import {socketLink} from '../api.links';

/**
 * @typedef {import('../../../declarations').Store} Store
 * @typedef {import('../../../declarations').INsData} NsData
 * @typedef {import('../../../declarations').INamespace} Namespace
 * @typedef {import('../../../declarations').IRoom} Room
 * @typedef {import('../../../declarations').IChatMessage} ChatMessage
 * @typedef {import('../../../declarations').IUserMessage} UserMessage
 * @typedef {import('../../../declarations').IUser} User
 * @typedef {SocketIOClient.Socket} Socket
 */

/**
 * @template T
 * @typedef {import('../../../declarations').Action} Action
 */

/**
 * @template A
 * @typedef {import('redux-thunk').ThunkAction<void, Store, void, A>} ThunkAction
 */

// Client actions.
export const UPDATE_NAMESPACES = 'update-namespaces'
export const SET_USER = 'set-user'
export const SET_NAMESPACE = 'set-namespace'

// Server actions.
export const UPDATE_ROOMS = 'update-rooms'
export const ADD_MESSAGE = 'add-message'
export const SET_ROOM = 'set-room'
export const SET_ROOM_COUNT = 'set-room-count'
export const SET_ROOM_HISTORY = 'set-room-history';
export const url = socketLink+'/';
export const connectionOptions = {
  "force new connection": true,
  "reconnection": true,
  "reconnectionDelay": 2000,                  //starts with 2 secs delay, then 4, 6, 8, until 60 where it stays forever until it reconnects
  "reconnectionDelayMax": 60000,             //1 minute maximum delay between connections
  "reconnectionAttempts": "Infinity",         //to prevent dead clients, having the user to having to manually reconnect after a server restart.
  "timeout": 10000,                           //before connect_error and connect_timeout are emitted.
  "transports": ["websocket"],             //forces the transport to be only websocket. Server needs to be setup as well/
  "path": '/beats'
}

const click = new Audio('sounds/click.mp3')
click.volume = 0.25

const alarm = new Audio('sounds/alarm.mp3')
alarm.volume = 0.5

/**
 * Update namespaces from the server.
 *
 * @param {NsData[]} namespaces
 *
 * @returns {ThunkAction<Action<NsData>>}
 */
export const updateNamespaces = (namespaces, dispatch) => {
  //dispatch(selectNamespace(namespaces[0]));
  return ({
    type: UPDATE_NAMESPACES,
    payload: namespaces
  });
};
export const updateDefaultNamespacess = (namespaces) => ({
  type: 'UPDATE_DEFAULT_NAMESPACE',
  payload: namespaces
})
export const updateNamespacess = (namespaces) => (dispatch) => {
  dispatch({ type: UPDATE_NAMESPACES, payload: namespaces })
  //dispatch(selectNamespace(namespaces[0]))
}

/**
 * Set the current chat user.
 *
 * @param {User} user
 *
 * @returns {Action<User>}
 */
export const setUser = (user) => {
  return { type: SET_USER, payload: user }
}

/**
 * Connect to an IO namespace.
 *
 * @param {NsData} ns
 *
 * @returns {ThunkAction<Action<NsData>>}
 */
export const selectNamespace = (ns, dispatch, data) => {
  if (data.namespace && data.namespace.endpoint) {
    if (data.namespace.endpoint === ns.endpoint) {
      return ({
        type: "SELECT_NAMESPACE", payload: { dispatch, data }
      })
    }
    data.namespace.socket.disconnect()
  }

  const socket = io(url + ns.endpoint, connectionOptions);
  socket.on('actions', (actions) => {
    actions.forEach((action) => {
      // Listen for add message actions from the server.
      if (action !== undefined && action.type === ADD_MESSAGE) {
        click.play().catch(() => { })
      }
      // Dispatch action.
      dispatch(action)
    })
  });
  const namespace = {
    ...ns,
    rooms: [],
    currentRoom: null,
    numUsers: 0,
    history: [],
    socket,
  }
  dispatch({ type: SET_NAMESPACE, payload: namespace })
  return ({
    type: "SELECT_NAMESPACE", payload: { dispatch, data }
  })
};
export const selectNamespacess = (ns) => (dispatch, getState) => {
  const { namespace: currentNs, } = getState()

  if (currentNs) {
    if (currentNs.endpoint === ns.endpoint) { return }
    currentNs.socket.disconnect()
  }

  const socket = io(url + ns.endpoint, connectionOptions);
  socket.on('actions', (actions) => {
    actions.forEach((action) => {
      // Listen for add message actions from the server.
      if (action.type === ADD_MESSAGE) {
        click.play().catch(() => { })
      }
      // Dispatch action.
      dispatch(action)
    })
  })

  /**
   * Create a new namespace object.
   *
   * @type {Namespace}
   */
  const namespace = {
    ...ns,
    rooms: [],
    currentRoom: null,
    numUsers: 0,
    history: [],
    socket,
  }
  dispatch({ type: SET_NAMESPACE, payload: namespace })
}

/**
 * Inform the server to join a room.
 *
 * @param {Room} room
 *
 * @returns {ThunkAction<Action<any>>}
 */
export const selectRoom = (room,namespace) => {

  //const { namespace } = getState()
  const { socket, currentRoom } = namespace

  if (room.title === currentRoom) { return ({type:'ALREADY_IN_ROOM',payload:room.title}) }
  socket.emit('join-room', room.title);
  return ({type:'JOINED_ROOM',payload:room.title});
}

/**
 * Send a chat message to the server.
 *
 * @param {UserMessage} msg
 *
 * @returns {ThunkAction<Action<UserMessage>>}
 */
export const sendMessage = (msg,namespace) => {
  //const { namespace } = getState()
  if (!namespace) { return ({type:'NAMESPACE_EMPTY'}) }
  namespace.socket.emit('message', msg);
  return ({type:'EMIT_MESSAGE',payload:msg});
}
export const sendPrivateMessage = (msg) =>{
  
}
export const connect = (user) =>{
  const options = {...connectionOptions,query:{user}}
  const socket = io(url, options)
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}
export const subscribe = (socket) => {
  return eventChannel(emit => {
    socket.on('changes',(msg)=>{
      emit(recievedChanges(msg))
    });
    socket.on('login', ({ payload }) => {
      //console.log(payload);
      emit(userConnected({payload}));
      //emit(addUser({ username }));
    });
    socket.on('logout', ({ username }) => {
      //emit(removeUser({ username }));
    });
    socket.on('notification', ({ message }) => {
      //emit(newMessage({ message }));
    });
    socket.on('connect',e=>{
      emit(youConnected(e))
    });
    socket.on('user-disconnected',e=>{
      console.log(e);
      emit(userDisconnected(e));
    })
    socket.on('disconnect', e => {
      // TODO: handle
      emit(youDisconnected(e))
    });
    return () => {};
  });
}