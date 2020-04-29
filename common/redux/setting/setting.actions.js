import {settingTypes} from './setting.types';
export const fetchUomStart = () => ({
  type: settingTypes.FETCH_UOM_START,
});
export const fetchUomSuccess = (collections) => ({
    type:settingTypes.FETCH_UOM_SUCCESS,
    payload:collections
})