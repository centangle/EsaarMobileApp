import { takeLatest, all, call,put,select,takeEvery } from 'redux-saga/effects';
import { donationTypes } from './donation.types';
import { selectCurrentUser } from "../user/user.selectors";
import {addDonationSuccess,addDonationFailure} from './donation.actions';
import { apiLink } from '../api.links';
const url = apiLink;
export function* addDonationAsync(action){
     try {
        const currentUser = yield select(selectCurrentUser);
        const donation = yield fetch(url + "/api/DonationRequest/Create", {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + currentUser.access_token
            },
            body: JSON.stringify(action.payload)
        }).then(async (response) => {
            if (response.status >= 205) {
                const result = await response.json();
                return { ...result, error: true };
            }else{
                return response.json();
            }
        });
        if (donation.error) {
            yield put(addDonationFailure(donation));
        } else {
            yield put(addDonationSuccess({ donation }));
        }
    } catch (error) {
        yield put(addDonationFailure(error));
    }
}
export function* addDonation(){
    yield takeLatest(donationTypes.ADD_DONATION_START, addDonationAsync)
}
export function* donationSagas() {
    yield all([
        call(addDonation)
    ]);
}