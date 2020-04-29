import { takeLatest, all, call } from 'redux-saga/effects';
import {notificationTypes} from './notification.types';
import { selectCurrentUser } from "../user/user.selectors";
export function* addNotificationAsync(item){

}
export function* addNotificationStart(){
  yield takeLatest(notificationTypes.ADD_NOTIFICATION_START,addNotificationAsync)
}
export function* notificationSagas() {
  yield all([
    call(addNotificationStart),
  ]);
}