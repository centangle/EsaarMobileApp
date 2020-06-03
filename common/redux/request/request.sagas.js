import { takeLatest, all, call, put, select, takeEvery } from 'redux-saga/effects';
import { requestTypes } from './request.types';
import { selectCurrentUser } from "../user/user.selectors";
import {
    addRequestSuccess, addRequestFailure, fetchRequestSuccess,
    fetchRequestThreadSuccess,
    fetchRequestStatusSuccess,
    fetchRequestDetailSuccess,
    addRequestThreadSuccess, addRequestThreadFailure,
    assignRequestSuccess,
    fetchThreadDetailSuccess
} from './request.actions';
import { apiLink } from '../api.links';
const url = apiLink;
export function* fetchRequestAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    let q = "recordsPerPage=" + action.params.itemsCountPerPage
        + "&currentPage=" + action.params.activePage
        + "&orderDir=Asc"
        + "&calculateTotal=true"
        + "&disablePagination=false";
    if (action.params && action.params.filters) {
        action.params.filters.forEach(filter => {
            if (filter.searchType) {
                let count = 0;
                filter.searchType.forEach(f => {

                    q += "&types[" + count + "]=" + f.Name;

                    count++;
                })
            }
            if (filter.status) {
                let count = 0;
                filter.status.forEach(f => {
                    q += "&statuses[" + count + "]=" + f.Name;
                    count++;
                })
            }
            if (filter.timePeriod) {
                filter.timePeriod.forEach(f => {
                    if (f.startDate || f.endDate) {
                        q += "&startDate=" + f.startDate;
                        q += "&endDate=" + f.endDate;
                    } else {
                        q += "&timePeriod=" + f.Name;
                    }
                })
            }
        })
    }
    //const q = "recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    try {
        const response = yield fetch(url + "/api/OrganizationRequest/GetPaginated?" + q, {
            method: "GET",
            //withCredentials: true,
            credentials: 'include',
            headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
            //credentials: "include"
        }).then(async (response) => {
            const result = await response.json();
            if (response.status >= 205) {
                return { result, error: true };
            }
            return {
                ok: true, result: result.Items,
                ...action.params,
                totalItemsCount: result.TotalCount
            };
        });
        if (response.ok) {
            yield put(fetchRequestSuccess(response));
        }
    } catch (error) {
        alert(error);
    }
}
export function* fetchThreadAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Organization&entityId=" + action.payload;
    try {
        const response = yield fetch(url + "/api/RequestThread/GetPaginated?" + q, {
            method: "GET",
            //withCredentials: true,
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
    } catch (error) {
        alert(error);
    }
}
export function* fetchRequestStatusAsync() {
    const currentUser = yield select(selectCurrentUser);
    //const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Organization&entityId=" + action.payload;
    try {
        const response = yield fetch(url + "/api/OrganizationRequest/GetRequestStatus", {
            method: "GET",
            //withCredentials: true,
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
    } catch (error) {
        alert(error);
    }
}
export function* addRequestThreadAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const request = yield fetch(url + "/api/RequestThread/AddRequestThread", {
            method: 'POST',
            //withCredentials: true,
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
            console.log(action);
            if(action.payload.EntityType==='Donation'){
                yield put({type:'FETCH_DONATION_REQUEST_THREAD_START',payload:action.payload.Entity.Id});
            }
            if(action.payload.EntityType==='Organization'){
                yield put({type:'FETCH_REQUEST_THREAD_START',payload:action.payload.Entity.Id});
            }
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
            //withCredentials: true,
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
            //withCredentials: true,
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
export function* modifyRegionsAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const request = yield fetch(url + "/api/OrganizationMember/UpdateOrganizationMembershipRegions", {
            method: 'POST',
            //withCredentials: true,
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
export function* assignRequestAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const q = "organizationId=" + action.payload.organizationId + "&requestId=" + action.payload.requestId;
        const request = yield fetch(url + "/api/OrganizationRequest/AssignRequest?" + q, {
            method: 'PUT',
            //withCredentials: true,
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
            yield put(assignRequestSuccess({ request, result: action.payload }));
        }
    } catch (error) {
        yield put(addRequestFailure(error));
    }
}
export function* fetchRequestDetailsAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    try {
        const response = yield fetch(url + "/api/OrganizationRequest/Get?requestId=" + action.payload, {
            method: "GET",
            //withCredentials: true,
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
            yield put(fetchRequestDetailSuccess(response.result));
        }
    } catch (error) {
        alert(error);
    }

}
export function* fetchThreadDetailAsync(action){
    const currentUser = yield select(selectCurrentUser);
    //const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Organization&entityId=" + action.payload;
    try {
        const response = yield fetch(url + "/api/RequestThread/Get/" + action.payload.id, {
            method: "GET",
            //withCredentials: true,
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
            yield put(fetchThreadDetailSuccess(response));
        }
    } catch (error) {
        alert(error);
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
export function* assignRequest() {
    yield takeLatest(requestTypes.ASSIGN_REQUEST_START, assignRequestAsync)
}
export function* modifyRegions() {
    yield takeLatest(requestTypes.MODIFY_REQUEST_REGIONS, modifyRegionsAsync)
}
export function* fetchThreadDetail() {
    yield takeLatest(requestTypes.FETCH_ORG_THREAD_DETAIL_START, fetchThreadDetailAsync)
}
export function* fetchRequestDetaail(){
    yield takeLatest(requestTypes.FETCH_ORG_REQUEST_DETAIL_START, fetchRequestDetailsAsync)
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
        call(modifyRegions),
        call(fetchThreadDetail),
        call(fetchRequestDetaail)
    ]);
}