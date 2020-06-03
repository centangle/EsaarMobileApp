import { takeLatest, takeEvery, all, call, put, select, take } from 'redux-saga/effects';
import { formEncode } from '../../utility/request';
import { connect, subscribe } from '../live/actions';

import { userTypes } from './user.types';
import { putInitialData, refreshLogin, loginError, signInSuccess, signUpSuccess, signUpFailure, searchGlobalComplete, signInFailure } from './user.actions';
import { selectCurrentUser, selectSocket } from "./user.selectors";
import { apiLink } from '../api.links';
const url = apiLink;
export function* addUserAsync(item) {

}
export function* addUserStart() {
  yield takeLatest(userTypes.ADD_USER_START, addUserAsync)
}

export function* signInAsync(action) {
  try {
    const response = yield fetch(url + "/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json" },
      ////withCredentials: true,
      body: formEncode(action.payload)
      //credentials: "include"
    }).then(async (response) => {
      if (response.status >= 205) {
        const result = await response.json();
        return { result, error: true };
      }
      return response.json();
    });
    if (response.error) {
      yield put(signInFailure(response));
    } else {
      yield put(signInSuccess(response));
    }
  } catch (error) {
    yield put(signInFailure({result:"Could not signin this time"}));
  }
}
export function* refreshTokenAsync(action) {
  try {
    if (action.payload) {
      const response = yield fetch(url + "/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json" },
        ////withCredentials: true,
        body: formEncode({ token: action.payload.access_token, refreshToken: action.payload.refresh_token })
        //credentials: "include"
      }).then(async (response) => {
        if (response.status >= 205) {
          const result = await response.json();
          return { result, error: true };
        }
        return response.json();
      });
      if (response.error) {
        yield put(signInFailure(response));
      } else {
        yield put(signInSuccess(response));
      }
    }
  } catch (error) {
    yield put(signInFailure({result:"Can not signin this time"}));
  }

}
export function* enterWithEmailStart() {
  yield takeEvery(
    userTypes.EMAIL_SIGN_IN_START,
    signInAsync
  );
}

export function* connectSocketAsync(action) {

  const u = yield select(selectCurrentUser);
  const socket = yield connect(u._id);
  socket.emit('login', u._id);
  yield put({ type: userTypes.SET_SOCKET, payload: socket });
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
  //socket.on("changes",onChanges);
}
export function* checkSessionAsync(action) {
  const user = yield select(selectCurrentUser);
  if (user) {
    const now = new Date();
    const utc = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds(),
      now.getTimezoneOffset() * 60000
    );
    let userTime = user ? new Date(user.expires_in) : null;
    if (userTime) {
      userTime = new Date(
        userTime.getFullYear(),
        userTime.getMonth(),
        userTime.getDate(),
        userTime.getHours(),
        userTime.getMinutes(),
        userTime.getSeconds(),
        userTime.getMilliseconds(),
        userTime.getTimezoneOffset() * 60000
      );
    }
    console.log(userTime, '-', utc, userTime <= utc);
    try {
      if (user.access_token && (userTime <= utc || user.expires_in === undefined)) {
        yield put(refreshLogin(user))
      }
    } catch (error) {
      yield put(loginError(error));
    }
  }
}
export function* applyUpdatesAsync(action) {
  const type = action.payload.type;
  const data = action.payload.payload;
  const payload = { ...data, isBackgroundChange: true };
  yield put({ type, payload });
}
export function* connectSocket() {
  yield takeLatest(
    userTypes.PUT_INITIAL_DATA,
    connectSocketAsync
  );
}
export function* applyUpdates() {
  yield takeLatest(
    userTypes.RECIEVED_CHANGES,
    applyUpdatesAsync
  )
}
export function* signUpAsync(action) {
  try {
    //const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const user = yield fetch(url + "/api/Account/Register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload)
    }).then(async (response) => {
      if (response.status >= 205) {
        const result = await response.json();
        return { result, error: true };
      }
      return {...action.payload};
    });
    if (user.error) {
      yield put(signUpFailure(user));
    } else {
      yield put(signUpSuccess({ user }));
      //yield signInAsync({username:user.Email,password:user.Password,grant_type:'password'});
    }
  } catch (error) {
    yield put(signUpFailure(error));
  }
}
export function* onSignUpStart() {
  yield takeEvery(userTypes.SIGN_UP_START, signUpAsync);
}
export function* searchGlobalAsync(action) {
  try {
    //const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const user = yield fetch(url + "/user/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: action.payload })
    }).then(response => response.json());
    yield put(searchGlobalComplete(user));
  } catch (error) {
  }
}
export function* onSearchGlobal() {
  yield takeLatest(userTypes.SEARCH_GLOBAL_MEMBER, searchGlobalAsync);
}
export function* signOutAsync() {
  //const socket = yield select(selectSocket);
  //socket.disconnect();
}
export function* onSignOut() {
  yield takeLatest(userTypes.SIGN_OUT, signOutAsync);
}
export function* checkSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, checkSessionAsync);
}
export function* refreshToken() {
  yield takeEvery(userTypes.REFRESH_LOGIN, refreshTokenAsync)
}
export function* userSagas() {
  yield all([
    call(checkSession),
    call(refreshToken),
    call(enterWithEmailStart),
    //call(connectSocket),
    call(applyUpdates),
    call(onSignUpStart),
    call(onSearchGlobal),
    call(onSignOut)
  ]);
}