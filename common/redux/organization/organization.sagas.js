import { takeLatest, all, call, put, select, takeEvery,takeLeading } from 'redux-saga/effects';
import { organizationTypes } from './organization.types';
import { selectCurrentUser } from "../user/user.selectors";
import {
    addOrganizationSuccess, addOrganizationFailure, fetchOrganizationSuccess,
    fetchOrgDetailSuccess, fetchOrgItemsSuccess,
    fetchOrgRequestsSuccess,
    fetchOrgMembersSuccess,
    requestSuccess, requestFailure,
    addOrgItemSuccess,addOrgItemFailure,
    removeOrgItemSuccess,removeOrgItemFailure
} from './organization.actions';
import { apiLink } from '../api.links';
const url = apiLink;
export function* fetchOrganizationAsync() {
    const currentUser = yield select(selectCurrentUser);
    const response = yield fetch(url + "/api/Organization/GetAllOrganizations?dataStructure=Tree", {
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
        return { ok: true, result };
    });
    if (response.ok) {
        yield put(fetchOrganizationSuccess(response));
    }
}
export function* addOrganizationAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const organization = yield fetch(url + "/api/Organization/Create", {
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
        if (organization.error) {
            yield put(addOrganizationFailure(organization));
        } else {
            yield put(addOrganizationSuccess({ organization }));
        }
    } catch (error) {
        yield put(addOrganizationFailure(error));
    }
}
export function* updateSingleOrganizationAsync(action){
    try {
        const currentUser = yield select(selectCurrentUser);
        const organization = yield fetch(url + "/api/Organization/Update", {
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
        if (organization.error) {
            yield put(addOrganizationFailure(organization));
        } else {
            yield put(addOrganizationSuccess({ organization }));
        }
    } catch (error) {
        yield put(addOrganizationFailure(error));
    }
}
export function* updateOrganizationAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const organization = yield fetch(url + "/api/Organization/UpdateMultipleOrganizationsWithChildrens", {
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
        if (organization.error) {
            yield put(addOrganizationFailure(organization));
        } else {
            yield put(addOrganizationSuccess({ organization }));
        }
    } catch (error) {
        yield put(addOrganizationFailure(error));
    }
}
export function* fetchOrgDetailAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const response = yield fetch(url + "/api/Organization/Get/" + action.payload, {
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
        return { ok: true, result };
    });
    if (response.ok) {
        yield put(fetchOrgDetailSuccess(response));
    }
}
export function* orgRequestAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const organization = yield fetch(url + "/api/OrganizationMember/RequestMembership", {
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
        if (organization.error) {
            yield put(requestFailure(organization));
        } else {
            yield put(requestSuccess({ organization }));
        }
    } catch (error) {
        yield put(requestFailure(error));
    }
}
export function* fetchOrgItemsAsync(action) {
    //GET /api/OrganizationItem/GetPaginated
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId="+action.payload+"&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    const response = yield fetch(url + "/api/OrganizationItem/GetPaginated?" + q, {
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
        yield put(fetchOrgItemsSuccess(response.result));
    }
}
export function* fetchOrgRequestsAsync(action){
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId="+action.payload+"&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
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
        yield put(fetchOrgRequestsSuccess(response.result));
    }
}
export function* fetchOrgMembersAsync(action){
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId="+action.payload+"&type="+action.userType+"&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    const response = yield fetch(url + "/api/OrganizationMember/GetPaginated?" + q, {
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
        yield put(fetchOrgMembersSuccess(response.result));
    }
}
export function* addItemAsync(action){
    try {
        const currentUser = yield select(selectCurrentUser);
        const organization = yield fetch(url + "/api/OrganizationItem/Create", {
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
        if (organization.error) {
            yield put(addOrgItemFailure({organization,request:action.payload}));
        } else {
            yield put(addOrgItemSuccess({ organization,request:action.payload }));
        }
    } catch (error) {
        yield put(addOrgItemFailure({error,request:action.payload}));
    }
}
export function* removeItemAsync(action){
    try {
        const currentUser = yield select(selectCurrentUser);
        const q = "organizationId="+action.payload.organizationId+"&itemId="+action.payload.itemId;
        const organization = yield fetch(url + "/api/OrganizationItem/DeleteOrganizationItem?"+q, {
            method: 'DELETE',
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
        if (organization.error) {
            yield put(removeOrgItemFailure({organization,request:action.payload}));
        } else {
            yield put(removeOrgItemSuccess({ organization,request:action.payload }));
        }
    } catch (error) {
        yield put(removeOrgItemFailure({error,request:action.payload}));
    }
}
export function* addOrganizationStart() {
    yield takeLatest(organizationTypes.ADD_ORGANIZATION_START, addOrganizationAsync)
}
export function* changeOrder() {
    yield takeEvery(organizationTypes.ORGANIZATION_ORDER_CHANGED, updateOrganizationAsync)
}
export function* fetchOrganization() {
    yield takeLatest(organizationTypes.FETCH_ORGANIZATION_START, fetchOrganizationAsync);
}
export function* orgRequest() {
    yield takeLatest(organizationTypes.REQUEST_START, orgRequestAsync)
}
export function* fetchOrgDetail() {
    yield takeLatest(organizationTypes.FETCH_ORG_DETAIL, fetchOrgDetailAsync)
}
export function* fetchOrgItems() {
    yield takeLeading(organizationTypes.FETCH_ORG_ITEMS_START, fetchOrgItemsAsync);
}
export function* fetchOrgRequests(){
    yield takeLatest(organizationTypes.FETCH_ORG_REQUESTS_START,fetchOrgRequestsAsync)
}
export function* fetchOrgMembers(){
    yield takeLatest(organizationTypes.FETCH_ORG_MEMBERS_START,fetchOrgMembersAsync)
}
export function* addItem(){
    yield takeEvery(organizationTypes.ADD_ORG_ITEMS_START,addItemAsync)
}
export function* removeItem(){
    yield takeEvery(organizationTypes.REMOVE_ORG_ITEMS_START,removeItemAsync)
}

export function* logoUpload(){
    yield takeEvery(organizationTypes.UPDATE_ORGANIZATION,updateSingleOrganizationAsync)
}
export function* organizationSagas() {
    yield all([
        call(addOrganizationStart),
        call(changeOrder),
        call(fetchOrganization),
        call(orgRequest),
        call(fetchOrgDetail),
        call(fetchOrgItems),
        call(fetchOrgRequests),
        call(fetchOrgMembers),
        call(addItem),
        call(removeItem),
        call(logoUpload)
    ]);
}