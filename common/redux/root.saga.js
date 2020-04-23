import { all, call } from 'redux-saga/effects';

import {settingSagas} from './setting/setting.sagas';
import {userSagas} from './user/user.sagas';
import {itemSagas} from './item/item.sagas';
import {organizationSagas} from './organization/organization.sagas';
import {notificationSagas} from './notification/notification.sagas';
import {requestSagas} from './request/request.sagas';
import {uploadSagas} from './upload/upload.sagas';
import {donationSagas} from './donation/donation.sagas';
import {regionSagas} from './region/region.sagas';
export default function* rootSaga() {
    yield all([
        call(settingSagas),call(userSagas),
        call(notificationSagas),
        call(itemSagas),
        call(organizationSagas),
        call(requestSagas),
        call(uploadSagas),
        call(donationSagas),
        call(regionSagas)
    ]);
}