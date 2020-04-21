import { organizationTypes } from './organization.types';
import { Toast } from 'native-base';
import { Messages } from '../../../constants/Messages';

const INITIAL_STATE = {
  sider: false,
  organizations: [],
  requests: [],
  campaigns: [],
  categories:[],
  items: [],
  packages: [],
  current: {},
  offices:[],
  campaignsLoading: false,
  itemsLoading: false,
  requestsLoading: false,
  packagesLoading:false,
  membersLoading: false,
  officesLoading:false,
  attachmentsLoading:false,
  accountsLoading:false,
  volunteerJoining: false,
  moderatorJoining: false,
  memberJoining: false,
  logo: null,
  form:{}
};

const organization = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ORG_CAMPAIGNS_START':
      return {
        ...state,
        campaignsLoading: true
      }
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        logo: action.uploadType === 'Logo' ? action.meta : null
      }
    case 'ADD_ORGANIZATION_START':
      return{
        ...state,
        form:{...action.payload,modal:true}
      }
    case 'ADD_ORGANIZATION_SUCCESS':
      Toast.show({
        text: Messages.Organisation_Added_Success,
        duration: 3000
      })
      return {
        ...state,
        logo: null,
        form:{modal:false,...action.payload}
      }
    case 'ADD_ORGANIZATION_FAILURE':
      return {
        ...state,
        form:{...state.form,error:action.payload}
      }
    case 'FETCH_ORG_OFFICES_SUCCESS':
      return{
        ...state,
        offices:action.payload.result
      }
    case 'FETCH_ORG_CAMPAIGNS_SUCCESS':
      return {
        ...state,
        campaigns: action.payload,
        campaignsLoading: false
      }
    case 'REQUEST_START':
      return {
        ...state,
        volunteerJoining: action.payload.Type === "Volunteer",
        moderatorJoining: action.payload.Type === "Moderator",
        memberJoining: action.payload.Type === 'Member'
      }
    case 'REQUEST_SUCCESS':
    case 'REQUEST_FAILURE':
      if (action.payload.result && action.payload.result.ExceptionMessage)
        Toast.show({
          text: action.payload.result.ExceptionMessage,
          duration: 3000
        })
      //alert(action.payload.result.ExceptionMessage);
      return {
        ...state,
        volunteerJoining: false,
        moderatorJoining: false,
        memberJoining: false
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
      return {
        ...state,
        membersLoading: false,
        members: action.payload
      }
    case 'FETCH_ORG_ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload,
        itemsLoading: false
      }
    case 'FETCH_ORG_PACKAGES_START':
      return {
        ...state,
        packagesLoading: true
      }
    case 'FETCH_ORG_PACKAGES_SUCCESS':
      return {
        ...state,
        packages: action.payload,
        packagesLoading: false
      }
    case 'FETCH_ORG_PACKAGES_FAILURE':
      return {
        ...state,
        packagesLoading:false
      }
    case 'OPEN_MODAL':
      return{
        ...state,
        form:{
          ...state.form,
          modal:true
        }
      }
      case 'CLOSE_MODAL':
      return{
        ...state,
        form:{
          modal:false
        }
      }
    case 'FETCH_ORG_CATEGORIES_SUCCESS':
      return{
        ...state,
        categories:action.payload
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
        organizations: {
          ...state.organizations,
          [action.payload.result.Id]: action.payload.result
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