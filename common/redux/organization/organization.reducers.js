import { organizationTypes } from './organization.types';

const INITIAL_STATE = {
  sider: false,
  organizations: [],
  requests: [],
  items: [],
  current: {},
  itemsLoading: false,
  requestsLoading: false,
  membersLoading:false,
  volunteerJoining:false,
  moderatorJoining:false,
  memberJoining:false
};

const organization = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REQUEST_START':
      return{
        ...state,
        volunteerJoining:action.payload.Type==="Volunteer",
        moderatorJoining:action.payload.Type==="Moderator",
        memberJoining:action.payload.Type==='Member'
      }
    case 'REQUEST_SUCCESS':
    case 'REQUEST_FAILURE':
      if(action.payload.result && action.payload.result.ExceptionMessage)
      alert(action.payload.result.ExceptionMessage);
      return{
        ...state,
        volunteerJoining:false,
        moderatorJoining:false,
        memberJoining:false
      }
    case 'FETCH_ORG_REQUESTS_START':
      return {
        ...state,
        requestsLoading: true
      }
    case 'FETCH_ORG_MEMBERS_START':
      return {
        ...state,
        membersLoading: true
      }
    case 'FETCH_ORG_ITEMS_START':
      return {
        ...state,
        itemsLoading: true
      }
    case 'FETCH_ORG_REQUESTS_SUCCESS':
      return {
        ...state,
        requestsLoading: false,
        requests: action.payload
      }
    case 'FETCH_ORG_MEMBERS_SUCCESS':
      return{
        ...state,
        membersLoading:false,
        members:action.payload
      }
    case 'FETCH_ORG_ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload,
        itemsLoading: false
      }
    case 'FETCH_ORGANIZATION_SUCCESS':
      return {
        ...state,
        organizations: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'ORGANIZATION_SELECTED':
      return {
        ...state,
        current: action.payload
      }
    case 'FETCH_ORG_DETAIL_SUCCESS':
      return {
        ...state,
        current: action.payload.result,
        organizations:{
          ...state.organizations,
          [action.payload.result.Id]:action.payload.result
        }
      }
    case organizationTypes.ADD_ORGANIZATION_START:
      return {
        ...state
      }
    case 'ADD_ORG_ITEMS_START':
      return {
        ...state,
      }
    case 'ADD_ORG_ITEMS_SUCCESS':
      return {
        ...state,
        items: [...state.items, { ...action.payload.request, Id: action.payload.organization }]
      }
    case 'ADD_ORG_ITEMS_FAILURE':
      return {
        ...state
      }
    case 'REMOVE_ORG_ITEMS_START':
      return {
        ...state,
      }
    case 'REMOVE_ORG_ITEMS_SUCCESS':
      return {
        ...state,
        items: state.items.filter(i => i.Item.Id !== action.payload.request.itemId)
      }
    case 'REMOVE_ORG_ITEMS_FAILURE':
      return {
        ...state
      }
    default:
      return state;
  }
}
export default organization;