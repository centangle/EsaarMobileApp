import { takeLatest, all, call,put,select,takeEvery } from 'redux-saga/effects';
import { donationTypes } from './donation.types';
import { selectCurrentUser } from "../user/user.selectors";
import {
    addDonationSuccess,addDonationFailure,
    addDonationApprovalSuccess,addDonationApprovalFailure,
    fetchDonationRequestSuccess,
    fetchDonationRequestThreadSuccess,
    fetchDonationDetailsSuccess,
    fetchRequestStatusSuccess,
    fetchDonationItemsSuccess
} from './donation.actions';
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
export function* addApprovalAsync(action){
    try {
        const currentUser = yield select(selectCurrentUser);
        const donation = yield fetch(url + "/api/DonationRequest/UpdateStatus?donationRequestOrganizationId="+action.payload.donationRequestOrganizationId+"&status="+action.payload.status+"&note="+action.payload.note, {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + currentUser.access_token
            },
            body: JSON.stringify(action.payload.items)
        }).then(async (response) => {
            if (response.status >= 205) {
                const result = await response.json();
                return { ...result, error: true };
            }else{
                return response.json();
            }
        });
        if (donation.error) {
            yield put(addDonationApprovalFailure(donation));
        } else {
            yield put(addDonationApprovalSuccess({ donation }));
        }
    } catch (error) {
        yield put(addDonationFailure(error));
    }
}
export function* fetchRequestAsync() {
    const currentUser = yield select(selectCurrentUser);
    const q = "recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    const response = yield fetch(url + "/api/DonationRequest/GetPaginated?" + q, {
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
        return { ok: true, result: result.Items };
    });
    if (response.ok) {
        yield put(fetchDonationRequestSuccess(response));
    }
}
export function* fetchThreadAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Donation&entityId=" + action.payload;
    const response = yield fetch(url + "/api/RequestThread/GetPaginated?" + q, {
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
        return { ok: true, result: result.Items, Id: action.payload };
    });
    if (response.ok) {
        yield put(fetchDonationRequestThreadSuccess(response));
    }
}
export function* fetchRequestStatusAsync() {
    const currentUser = yield select(selectCurrentUser);
    //const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Organization&entityId=" + action.payload;
    const response = yield fetch(url + "/api/DonationRequest/GetRequestStatus", {
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
        return { ok: true, result: result };
    });
    if (response.ok) {
        yield put(fetchRequestStatusSuccess(response));
    }
}
export function* fetchDonationDetailsAsync(action){
    const currentUser = yield select(selectCurrentUser);
    //const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Organization&entityId=" + action.payload;
    const response = yield fetch(url + "/api/DonationRequest/Get?organizationRequestId="+action.payload, {
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
        return { ok: true, result: result };
    });
    if (response.ok) {
        yield put(fetchDonationDetailsSuccess(response.result));
    }
}
export function* fetchDonationItemsAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    //const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Organization&entityId=" + action.payload;
    const response = yield fetch(url + "/api/DonationRequest/GetItems?organizationRequestId="+action.payload, {
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
        return { ok: true, result: result };
    });
    if (response.ok) {
        yield put(fetchDonationItemsSuccess(response));
    }
}
export function* addDonation(){
    yield takeLatest(donationTypes.ADD_DONATION_START, addDonationAsync)
}
export function* fetchRequest() {
    yield takeLatest(donationTypes.FETCH_DONATION_REQUEST_START, fetchRequestAsync);
}
export function* fetchThread() {
    yield takeLatest(donationTypes.FETCH_DONATION_REQUEST_THREAD_START, fetchThreadAsync)
}
export function* fetchRequestStatus() {
    yield takeLatest(donationTypes.FETCH_DONATION_REQUEST_STATUS_START, fetchRequestStatusAsync)
}
export function* fetchDonationItems(){
    yield takeLatest(donationTypes.FETCH_DONATION_ITEMS_START, fetchDonationItemsAsync)
}
export function* fetchDonationDetails(){
    yield takeLatest(donationTypes.FETCH_DONATION_DETAILS_START, fetchDonationDetailsAsync)
}
export function* addApproval(){
    yield takeLatest(donationTypes.ADD_DONATION_APPROVAL_START, addApprovalAsync)
}
export function* donationSagas() {
    yield all([
        call(addDonation),
        call(addApproval),
        call(fetchRequest),
        call(fetchThread),
        call(fetchRequestStatus),
        call(fetchDonationItems),
        call(fetchDonationDetails)
    ]);
}