import { takeLatest, all, call,select,put } from 'redux-saga/effects';
import {settingTypes} from './setting.types';
import {fetchUomSuccess} from './setting.actions';
import { selectCurrentUser } from "../user/user.selectors";
import { apiLink } from '../api.links';
const url = apiLink;
export function* addSettingAsync(item){

}
export function* fetchUomAsync(){
const currentUser = yield select(selectCurrentUser);
    const response = yield fetch(url + "/api/UOM/Get", {
        method: "GET",
        withCredentials: true,
        credentials: 'include',
        headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
        //credentials: "include"
    }).then(async (response) => {
        const result = await response.json();
        if (response.status >= 205) {
            return { result, error: true };
        }
        return { ok: true, result:result.Items };
    });
    if (response.ok) {
        yield put(fetchUomSuccess(response));
    }
}
export function* addSettingStart(){
  yield takeLatest(settingTypes.ADD_SETTING_START,addSettingAsync)
}
export function* fetchUom(){
  yield takeLatest(settingTypes.FETCH_UOM_START,fetchUomAsync)
}
export function* settingSagas() {
  yield all([
    call(addSettingStart),
    call(fetchUom)
  ]);
}