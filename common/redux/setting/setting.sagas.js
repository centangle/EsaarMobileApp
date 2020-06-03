import { takeLatest, all, call,select,put } from 'redux-saga/effects';
import {settingTypes} from './setting.types';
//import {fetchUomSuccess} from './setting.actions';
import { selectCurrentUser } from "../user/user.selectors";
import { apiLink } from '../api.links';
const url = apiLink;
export function* addSettingAsync(item){

}

export function* addSettingStart(){
  yield takeLatest(settingTypes.ADD_SETTING_START,addSettingAsync)
}
export function* settingSagas() {
  yield all([
    call(addSettingStart),
    //call(fetchUom)
  ]);
}