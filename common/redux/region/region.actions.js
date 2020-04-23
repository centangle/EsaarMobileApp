import {regionTypes} from './region.types';
export const putInitialData = collections =>({
  type:regionTypes.PUT_INITIAL_DATA,
  payload:collections
});
export const addRegionSuccess = region => ({
  type: regionTypes.ADD_REGION_SUCCESS,
  payload: region
});

export const fetchRegionSuccess = collections =>({
  type:regionTypes.FETCH_REGION_SUCCESS,
  payload:collections
});
export const fetchStatesSuccess = collections =>({
  type:regionTypes.FETCH_STATES_SUCCESS,
  payload:collections
});
export const fetchDistrictsSuccess = collections =>({
  type:regionTypes.FETCH_DISTRICTS_SUCCESS,
  payload:collections
});
export const fetchTehsilsSuccess = collections =>({
  type:regionTypes.FETCH_TEHSILS_SUCCESS,
  payload:collections
});
export const fetchUcsSuccess = collections =>({
  type:regionTypes.FETCH_UCS_SUCCESS,
  payload:collections
});
export const fetchRegionDetailSuccess = collections =>({
  type:regionTypes.FETCH_REGION_DETAIL_SUCCESS,
  payload:collections
});
export const addRegionFailure = error => ({
  type: regionTypes.ADD_REGION_FAILURE,
  payload: error
});
export const fetchRegionStart = () => ({
  type: regionTypes.FETCH_REGION_START
});
export const fetchRegionLevelSuccess = collections =>({
  type:regionTypes.FETCH_REGION_LEVELS_SUCCESS,
  payload:collections
});
export const fetchCountriesSuccess = collections =>({
  type:regionTypes.FETCH_COUNTRIES_SUCCESS,
  payload:collections
});