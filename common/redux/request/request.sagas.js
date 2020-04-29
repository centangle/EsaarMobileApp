import { takeLatest, all, call, put, select, takeEvery } from 'redux-saga/effects';
import { requestTypes } from './request.types';
import { selectCurrentUser } from "../user/user.selectors";
import {
    addRequestSuccess, addRequestFailure, fetchRequestSuccess,
    fetchRequestThreadSuccess,
    fetchRequestStatusSuccess,
    addRequestThreadSuccess, addRequestThreadFailure,
    assignRequestSuccess
} from './request.actions';
import { apiLink } from '../api.links';
const url = apiLink;
export function* fetchRequestAsync() {
    const currentUser = yield select(selectCurrentUser);
    const q = "recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    const response = yield fetch(url + "/api/OrganizationRequest/GetPaginated?" + q, {
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
        yield put(fetchRequestSuccess(response));
    }
}
export function* fetchThreadAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Organization&entityId=" + action.payload;
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
        yield put(fetchRequestThreadSuccess(response));
    }
}
export function* fetchRequestStatusAsync() {
    const currentUser = yield select(selectCurrentUser);
    //const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Organization&entityId=" + action.payload;
    const response = yield fetch(url + "/api/OrganizationRequest/GetRequestStatus", {
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
export function* addRequestThreadAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const request = yield fetch(url + "/api/RequestThread/AddRequestThread", {
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
                return { result, error: true };
            }
            return response.json();
        });
        if (request.error) {
            yield put(addRequestThreadFailure(request));
        } else {
            yield put(addRequestThreadSuccess({ request }));
        }
    } catch (error) {
        yield put(addRequestThreadFailure(error));
    }
}
export function* addRequestAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const request = yield fetch(url + "/api/Request/Create", {
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
                return { result, error: true };
            }
            return response.json();
        });
        if (request.error) {
            yield put(addRequestFailure(request));
        } else {
            yield put(addRequestSuccess({ request }));
        }
    } catch (error) {
        yield put(addRequestFailure(error));
    }
}
export function* updateRequestAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const request = yield fetch(url + "/api/Request/UpdateMultipleRequestsWithChildrens", {
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + currentUser.access_token
            },
            body: JSON.stringify(action.payload)
        }).then(async (response) => {
            if (response.status >= 205) {
                const result = await response.json();
                return { result, error: true };
            }
            return response.json();
        });
        if (request.error) {
            yield put(addRequestFailure(request));
        } else {
            yield put(addRequestSuccess({ request }));
        }
    } catch (error) {
        yield put(addRequestFailure(error));
    }
}
export function* modifyRegionsAsync(action){
    try {
        const currentUser = yield select(selectCurrentUser);
        const request = yield fetch(url + "/api/OrganizationMember/UpdateOrganizationMembershipRegions", {
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
                return { result, error: true };
            }
            return response.json();
        });
        if (request.error) {
            yield put(addRequestFailure(request));
        } else {
            yield put(addRequestSuccess({ request }));
        }
    } catch (error) {
        yield put(addRequestFailure(error));
    }
}
export function* assignRequestAsync(action){
    try {
        const currentUser = yield select(selectCurrentUser);
        const q = "organizationId="+action.payload.organizationId+"&requestId="+action.payload.requestId;
        const request = yield fetch(url + "/api/OrganizationRequest/AssignRequest?"+q, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + currentUser.access_token
            },
            body: JSON.stringify(action.payload)
        }).then(async (response) => {
            if (response.status >= 205) {
                const result = await response.json();
                return { result, error: true };
            }
            return response.json();
        });
        if (request.error) {
            yield put(addRequestFailure(request));
        } else {
            yield put(assignRequestSuccess({ request,result:action.payload }));
        }
    } catch (error) {
        yield put(addRequestFailure(error));
    }
}
export function* addRequestStart() {
    yield takeEvery(requestTypes.ADD_REQUEST_START, addRequestAsync)
}
export function* changeOrder() {
    yield takeEvery(requestTypes.REQUEST_ORDER_CHANGED, updateRequestAsync)
}
export function* fetchRequest() {
    yield takeLatest(requestTypes.FETCH_REQUEST_START, fetchRequestAsync);
}
export function* fetchThread() {
    yield takeLatest(requestTypes.FETCH_REQUEST_THREAD_START, fetchThreadAsync)
}
export function* addRequestThreadStart() {
    yield takeEvery(requestTypes.ADD_REQUEST_THREAD_START, addRequestThreadAsync);
}
export function* fetchRequestStatus() {
    yield takeLatest(requestTypes.FETCH_REQUEST_STATUS_START, fetchRequestStatusAsync)
}
export function* assignRequest(){
    yield takeLatest(requestTypes.ASSIGN_REQUEST_START,assignRequestAsync)
}
export function* modifyRegions(){
    yield takeLatest(requestTypes.MODIFY_REQUEST_REGIONS,modifyRegionsAsync)
}
export function* requestSagas() {
    yield all([
        call(addRequestStart),
        call(addRequestThreadStart),
        call(changeOrder),
        call(fetchRequest),
        call(fetchThread),
        call(fetchRequestStatus),
        call(assignRequest),
        call(modifyRegions)
    ]);
}