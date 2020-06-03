import { regionTypes } from './region.types';
import shortid from 'shortid';

const INITIAL_STATE = {
  sider: false,
  levels: {},
  countries: {},
  states: {},
  districts: {},
  tehsils: {},
  ucs: {},
  regions: {},
};

const region = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_REGION_LEVELS_SUCCESS':
      return {
        ...state,
        levels: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'FETCH_COUNTRIES_SUCCESS':
      return {
        ...state,
        countries: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'Volunteer_SELECTED':
    case 'Modarator_SELECTED':
      return{
        ...state,
        regions:action.payload.Regions.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'LOAD_CAMPAIGN_REGIONS':
    case 'LOAD_ORG_REGIONS':
      return {
        ...state,
        regions: action.payload.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'UNLOAD_CAMPAIGN_REGIONS':
    case 'ADD_ORG_REGION_SUCCESS':
    case 'UNLOAD_ORG_REGIONS':
      return{
        ...state,
        regions:[]
      }
    case 'FETCH_STATES_SUCCESS':
      return {
        ...state,
        states: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'FETCH_DISTRICTS_SUCCESS':
      return {
        ...state,
        districts: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'FETCH_TEHSILS_SUCCESS':
      return {
        ...state,
        tehsils: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'FETCH_UCS_SUCCESS':
      return {
        ...state,
        ucs: action.payload.result.reduce((obj, item) => {
          obj[item.Id] = item
          return obj
        }, {})
      }
    case 'FETCH_REGION_SUCCESS':
      return {
        ...state,
        regions: [...action.payload.result]
      }
    case 'ADD_REGION_START':
      return {
        ...state
      }
    case 'ADD_REGION':
      const id = shortid.generate();
      return {
        ...state,
        regions: {
          ...state.regions,
          [id]: action.payload
        }
      }
    case 'REMOVE_REGION':
      const filtered = state.regions;
      delete filtered[action.payload];
      return {
        ...state,
        regions: {
          ...filtered,
        }
      }
    default:
      return state;
  }
}
export default region;