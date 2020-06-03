import { campaignTypes } from './campaign.types';
const toaster = require('../../../web/components/toaster/index');

const INITIAL_STATE = {
  sider: false,
  campaigns: {},
  requests: [],
  categories: [],
  items: [],
  packages: [],
  current: {},
  offices: [],
  accounts: [],
  regions: [],
  campaignsLoading: false,
  itemsLoading: false,
  requestsLoading: false,
  packagesLoading: false,
  membersLoading: false,
  officesLoading: false,
  accountsLoading: false,
  attachmentsLoading: false,
  volunteerJoining: false,
  moderatorJoining: false,
  memberJoining: false,
  regionsLoading: false,
  logo: null,
  form: {},
  selectedFilters:{Item:[],Filter:[{Id: "InMyRegion", Name: "InMyRegion"}]}
};

const campaign = (state = INITIAL_STATE, action) => {
  switch (action.type) {
        case 'SET_CAMPAIGN_FILTERS':
      let current = state.selectedFilters[action.payload.from]
        ? state.selectedFilters[action.payload.from]
        : [];
      if (action.payload.clearOld) {
        current = [];
      }
      if (!action.payload.checked) {
        if (!current.find(i => action.payload.item.Id === i.Id))
          current.push(action.payload.item);
      } else {
        current.splice(current.indexOf(action.payload.item), 1);
      }
      if(action.payload.clearAllExceptCat){
        state.selectedFilters={Item:[...state.selectedFilters.Item]};
      }
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          [action.payload.from]: [...current],
        },
      }
    case 'FETCH_CAMPAIGN_CAMPAIGNS_START':
      return {
        ...state,
        campaignsLoading: true
      }
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        logo: action.uploadType === 'Logo' ? action.meta : null
      }
    case 'ADD_CAMPAIGN_ATTACHMENT_START':
    case 'ADD_CAMPAIGN_OFFICE_START':
    case 'ADD_CAMPAIGN_ACCOUNT_START':
    case 'ADD_CAMPAIGN_CAMPAIGN_START':
    case 'ADD_CAMPAIGN_ITEMS_START':
    case 'ADD_CAMPAIGN_PACKAGE_START':
    case 'ADD_CAMPAIGN_START':
      return {
        ...state,
        form: { ...state.form,...action.payload, modal: true }
      }
    case 'ADD_CAMPAIGN_ATTACHMENT_SUCCESS':
    case 'ADD_CAMPAIGN_OFFICE_SUCCESS':
    case 'ADD_CAMPAIGN_ACCOUNT_SUCCESS':
    case 'ADD_CAMPAIGN_CAMPAIGN_SUCCESS':
    case 'ADD_CAMPAIGN_PACKAGE_SUCCESS':
    case 'ADD_CAMPAIGN_SUCCESS':
    case 'ADD_CAMPAIGN_REGION_SUCCESS':
    case 'UPDATE_CAMPAIGN_SUCCESS':
      return {
        ...state,
        logo: null,
        form: { modal: false, ...action.payload },
      }
    case 'ADD_CAMPAIGN_ATTACHMENT_FAILURE':
    case 'ADD_CAMPAIGN_OFFICE_FAILURE':
    case 'ADD_CAMPAIGN_ACCOUNT_FAILURE':
    case 'ADD_CAMPAIGN_CAMPAIGN_FAILURE':
    case 'ADD_CAMPAIGN_ITEMS_FAILURE':
    case 'ADD_CAMPAIGN_PACKAGE_FAILURE':
    case 'ADD_CAMPAIGN_FAILURE':
      if (action.payload.result && action.payload.result.ExceptionMessage)
        toaster.error("Notification Message", action.payload.result.ExceptionMessage, { timeOut: 500000 })
      return {
        ...state,
        form: { ...state.form, error: action.payload, modal: true }
      }

    case 'FETCH_CAMPAIGN_OFFICES_START':
      return {
        ...state,
        officesLoading: true
      }
    case 'FETCH_CAMPAIGN_OFFICES_SUCCESS':
      return {
        ...state,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        officesLoading: false,
        offices: action.payload.result
      }
    case 'FETCH_CAMPAIGN_ACCOUNTS_START':
      return {
        ...state,
        accountsLoading: true
      }
    case 'FETCH_CAMPAIGN_ACCOUNTS_SUCCESS':
      return {
        ...state,
        accountsLoading: false,
        accounts: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
      }
    case 'FETCH_CAMPAIGN_ATTACHMENTS_START':
      return {
        ...state,
        attachmentsLoading: true
      }
    case 'FETCH_CAMPAIGN_ATTACHMENTS_SUCCESS':
      return {
        ...state,
        attachmentsLoading: false,
        attachments: action.payload.result,
        accounts: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
      }
    case 'FETCH_CAMPAIGN_CAMPAIGNS_SUCCESS':
      return {
        ...state,
        campaigns: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        campaignsLoading: false
      }
    case 'FETCH_CAMPAIGN_REGIONS_START':
      return {
        ...state,
        regionsLoading: true
      }
    case 'FETCH_CAMPAIGN_REGIONS_SUCCESS':
      return {
        ...state,
        regions: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        regionsLoading: false,
      }
    case 'CAMPAIGN_REQUEST_START':
      return {
        ...state,
        volunteerJoining: action.payload.Type === "Volunteer",
        moderatorJoining: action.payload.Type === "Moderator",
        memberJoining: action.payload.Type === 'Member'
      }
    case 'CAMPAIGN_REQUEST_SUCCESS':
    case 'CAMPAIGN_REQUEST_FAILURE':
      if (action.payload.result && action.payload.result.ExceptionMessage)
        toaster.error("Notification Message", action.payload.result.ExceptionMessage, { timeOut: 50000 })
      //alert(action.payload.result.ExceptionMessage);
      return {
        ...state,
        volunteerJoining: false,
        moderatorJoining: false,
        memberJoining: false,
        form: { modal: false }
      }
    case 'FETCH_CAMPAIGN_REQUESTS_START':
      return {
        ...state,
        requestsLoading: true
      }
    case 'FETCH_CAMPAIGN_MEMBERS_START':
      return {
        ...state,
        membersLoading: true
      }
    case 'FETCH_CAMPAIGN_ITEMS_START':
      return {
        ...state,
        itemsLoading: true
      }
    case 'FETCH_CAMPAIGN_REQUESTS_SUCCESS':
      return {
        ...state,
        requestsLoading: false,
        requests: {
          items: action.payload.result,
          totalItemsCount: parseInt(action.payload.totalItemsCount),
          activePage: action.payload.activePage,
          itemsCountPerPage: action.payload.itemsCountPerPage,
          pageRangeDisplayed: action.payload.pageRangeDisplayed
        }
      }
    case 'FETCH_CAMPAIGN_MEMBERS_SUCCESS':
      return {
        ...state,
        membersLoading: false,
        members: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
      }
    case 'FETCH_CAMPAIGN_ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        itemsLoading: false
      }
    case 'FETCH_CAMPAIGN_PACKAGES_START':
      return {
        ...state,
        packagesLoading: true
      }
    case 'FETCH_CAMPAIGN_PACKAGES_SUCCESS':
      return {
        ...state,
        packages: action.payload.result,
        totalItemsCount: parseInt(action.payload.totalItemsCount),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        packagesLoading: false
      }
    case 'FETCH_CAMPAIGN_PACKAGES_FAILURE':
      return {
        ...state,
        packagesLoading: false
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        form: {
          ...state.form,
          campaignModal: action.payload==='CAMPAIGN'?true:false,
          orgModal:action.payload==='ORG'?true:false,
          regionModal:action.payload==='CAMPAIGN_REGION'?true:false,
          campaignItemModal:action.payload==='CAMPAIGN_ITEMS_MODAL'?true:false,
          attachmentModal:action.payload==='ATTACHMENT'?true:false
        }
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        form: {
          ...state.form,
          modal: false,
          orgModal:false,
          regionModal:false,
          campaignItemModal:false,
          campaignModal:false,
          attachmentModal:false
        }
      }
    case 'FETCH_CAMPAIGN_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.payload
      }
    case 'FETCH_CAMPAIGN_SUCCESS':
      return {
        ...state,
        form: {},
        totalItemsCount: parseInt(parseInt(action.payload.totalItemsCount)),
        activePage: action.payload.activePage,
        itemsCountPerPage: action.payload.itemsCountPerPage,
        pageRangeDisplayed: action.payload.pageRangeDisplayed,
        campaigns: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'CAMPAIGN_SELECTED':
      return {
        ...state,
        current: action.payload
      }
    case 'FETCH_CAMPAIGN_DETAIL_SUCCESS':
      return {
        ...state,
        current: action.payload.result,
        campaigns: {
          ...state.campaigns,
          [action.payload.result.Id]: action.payload.result
        }
      }
    case 'ADD_CAMPAIGN_ITEMS_SUCCESS':
      return {
        ...state,
        items: [...state.items, { ...action.payload.request, Id: action.payload.campaign }],
        form:{}
      }
    case 'REMOVE_CAMPAIGN_ITEMS_START':
      return {
        ...state,
      }
    case 'REMOVE_CAMPAIGN_ITEMS_SUCCESS':
      return {
        ...state,
        items: state.items.filter(i => i.Item.Id !== action.payload.request.itemId)
      }
    case 'REMOVE_CAMPAIGN_ITEMS_FAILURE':
      if (action.payload.campaign && action.payload.campaign.result.ExceptionMessage)
        toaster.error("Notification Message", action.payload.campaign.result.ExceptionMessage, { timeOut: 50000 })
      return {
        ...state
      }
    default:
      return state;
  }
}
export default campaign;