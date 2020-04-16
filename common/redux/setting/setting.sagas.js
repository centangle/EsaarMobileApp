import { takeLatest, all, call } from 'redux-saga/effects';
import {settingTypes} from './setting.types';
import { selectCurrentUser } from "../user/user.selectors";
export function* addSettingAsync(item){

}
export function* addSettingStart(){
  yield takeLatest(settingTypes.ADD_SETTING_START,addSettingAsync)
}
export function* settingSagas() {
  yield all([
    call(addSettingStart),
  ]);
}