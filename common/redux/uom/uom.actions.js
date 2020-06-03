import {uomTypes} from './uom.types';
export const putInitialData = collections =>({
  type:uomTypes.PUT_INITIAL_DATA,
  payload:collections
});
export const addUomSuccess = uom => ({
  type: uomTypes.ADD_UOM_SUCCESS,
  payload: uom
});
export const removeUomFailure = error=>({
  type:uomTypes.REMOVE_UOM_FAILURE,
  payload:error
})
export const fetchUomSuccess = collections =>({
  type:uomTypes.FETCH_UOM_SUCCESS,
  payload:collections
});
export const fetchUomDetailSuccess = collections =>({
  type:uomTypes.FETCH_UOM_DETAIL_SUCCESS,
  payload:collections
});
export const addUomFailure = error => ({
  type: uomTypes.ADD_UOM_FAILURE,
  payload: error
});
export const fetchUomStart = () => ({
  type: uomTypes.FETCH_UOM_START
});
export const fetchPeriferalUomStart = () =>({
  type:uomTypes.FETCH_PERIFERAL_UOMS_START
});
export const fetchPeriferalUomSuccess = collections=>({
  type:uomTypes.FETCH_PERIFERAL_UOMS_SUCCESS,
  payload:collections
});
export const removeUomSuccess = collections =>({
  type:uomTypes.REMOVE_UOM_SUCCESS,
  payload:collections
});
export const updateUomSuccess = collections =>({
  type:uomTypes.UPDATE_UOM_SUCCESS,
  payload:collections
});
export const updateUomFailure = error =>({
  type:uomTypes.UPDATE_UOM_FAILURE,
  payload:error
});