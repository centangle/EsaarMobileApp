import { takeLatest, all, call, put, select, takeEvery, takeLeading } from 'redux-saga/effects';
import { organizationTypes } from './organization.types';
import { selectCurrentUser } from "../user/user.selectors";
import {
    addOrganizationSuccess, addOrganizationFailure,
    addCampaignSuccess,addCampaignFailure,
    addPackageFailure,addPackageSuccess,
    addOfficeFailure,
    addOfficeSuccess,
    addAccountSuccess,
    addAccountFailure,
    addAttachmentFailure,
    addAttachmentSuccess,
    addOrgRegionFailure,
    addOrgRegionSuccess,
    fetchOrganizationSuccess,
    fetchOrgDetailSuccess, fetchOrgItemsSuccess,
    fetchOrgRequestsSuccess,
    fetchOrgPackagesSuccess,
    fetchOrgCampaignsSuccess,
    fetchOrgCategoriesSuccess,
    fetchOrgMembersSuccess,
    fetchOrgAccountsSuccess,
    fetchOrgOfficesSuccess,
    fetchOrgAttachmentsSuccess,
    fetchOrgRegionsSuccess,
    requestSuccess, requestFailure,
    addOrgItemSuccess, addOrgItemFailure,
    removeOrgItemSuccess, removeOrgItemFailure
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
export function* fetchOrgAccountsAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    const response = yield fetch(url + "/api/OrganizationAccount/GetPaginated?"+q, {
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
        yield put(fetchOrgAccountsSuccess(response));
    }
}
export function* fetchOrgOfficesAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    const response = yield fetch(url + "/api/OrganizationOffice/GetPaginated?"+q, {
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
        yield put(fetchOrgOfficesSuccess(response));
    }
}
export function* fetchOrgAttachmentsAsync(action){
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    const response = yield fetch(url + "/api/OrganizationAttachment/GetPaginated?"+q, {
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
        yield put(fetchOrgAttachmentsSuccess(response));
    }
}
export function* fetchOrgRegionsAsync(action){
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    const response = yield fetch(url + "/api/OrganizationRegion/GetPaginated?"+q, {
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
        yield put(fetchOrgRegionsSuccess(response));
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
export function* addCampaignAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const organization = yield fetch(url + "/api/Campaign/Create", {
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
            yield put(addCampaignFailure(organization));
        } else {
            yield put(addCampaignSuccess({ organization }));
        }
    } catch (error) {
        yield put(addCampaignFailure(error));
    }
}
export function* addPackageAsync(action){
    try {
        const currentUser = yield select(selectCurrentUser);
        const organization = yield fetch(url + "/api/OrganizationPackage/Create", {
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
            yield put(addPackageFailure(organization));
        } else {
            yield put(addPackageSuccess({ organization }));
        }
    } catch (error) {
        yield put(addPackageFailure(error));
    }
}
export function* addOfficeAsync(action){
    try {
        const currentUser = yield select(selectCurrentUser);
        const organization = yield fetch(url + "/api/OrganizationOffice/Create", {
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
            yield put(addOfficeFailure(organization));
        } else {
            yield put(addOfficeSuccess({ organization }));
        }
    } catch (error) {
        yield put(addOfficeFailure(error));
    }
}
export function* addAttachmentsAsync(action){
    try {
        const currentUser = yield select(selectCurrentUser);
        const q = 'organizationId='+action.payload.organizationId;//+'&attachments='+action.payload.attachments;
        const organization = yield fetch(url + "/api/OrganizationAttachment/Create?"+q, {
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + currentUser.access_token
            },
            body: JSON.stringify(action.payload.attachments)
        }).then(async (response) => {
            if (response.status >= 205) {
                const result = await response.json();
                return { result, error: true };
            }
            return response.json();
        });
        if (organization.error) {
            yield put(addAttachmentFailure(organization));
        } else {
            yield put(addAttachmentSuccess({ organization }));
        }
    } catch (error) {
        yield put(addAttachmentFailure(error));
    }
}
export function* addOrgRegionAsyn(action){
     try {
        const currentUser = yield select(selectCurrentUser);
        const q = 'organizationId='+action.payload.organizationId;//+'&attachments='+action.payload.attachments;
        const organization = yield fetch(url + "/api/OrganizationRegion/Modify?"+q, {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + currentUser.access_token
            },
            body: JSON.stringify(action.payload.regions)
        }).then(async (response) => {
            if (response.status >= 205) {
                const result = await response.json();
                return { result, error: true };
            }
            return response.json();
        });
        if (organization.error) {
            yield put(addOrgRegionFailure(organization));
        } else {
            yield put(addOrgRegionSuccess({ organization }));
        }
    } catch (error) {
        yield put(addOrgRegionFailure(error));
    }
}
export function* addAccountAsync(action){
    try {
        const currentUser = yield select(selectCurrentUser);
        const organization = yield fetch(url + "/api/OrganizationAccount/Create", {
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
            yield put(addAccountFailure(organization));
        } else {
            yield put(addAccountSuccess({ organization }));
        }
    } catch (error) {
        yield put(addAccountFailure(error));
    }
}
export function* updateSingleOrganizationAsync(action) {
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
    const q = "organizationId=" + action.payload + "&itemType=General&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
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
export function* fetchOrgRequestsAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
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
export function* fetchOrgPackagesAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId=" + action.payload + "&itemType=Package&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
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
        yield put(fetchOrgPackagesSuccess(response.result));
    }
}
export function* fetchOrgMembersAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId=" + action.payload + "&type=" + action.userType + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
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
export function* fetchOrgCategoriesAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = action.payload;//"organizationId="+action.payload+"&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    const response = yield fetch(url + "/api/Organization/GetCategories/" + q, {
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
        yield put(fetchOrgCategoriesSuccess(response.result));
    }
}
export function* fetchOrgCampaignAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    const response = yield fetch(url + "/api/Campaign/GetPaginated?" + q, {
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
        yield put(fetchOrgCampaignsSuccess(response.result));
    }
}
export function* addItemAsync(action) {
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
            yield put(addOrgItemFailure({ organization, request: action.payload }));
        } else {
            yield put(addOrgItemSuccess({ organization, request: action.payload }));
        }
    } catch (error) {
        yield put(addOrgItemFailure({ error, request: action.payload }));
    }
}
export function* removeItemAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const q = "organizationId=" + action.payload.organizationId + "&itemId=" + action.payload.itemId;
        const organization = yield fetch(url + "/api/OrganizationItem/DeleteOrganizationItem?" + q, {
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
            yield put(removeOrgItemFailure({ organization, request: action.payload }));
        } else {
            yield put(removeOrgItemSuccess({ organization, request: action.payload }));
        }
    } catch (error) {
        yield put(removeOrgItemFailure({ error, request: action.payload }));
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
export function* fetchOrgRequests() {
    yield takeLatest(organizationTypes.FETCH_ORG_REQUESTS_START, fetchOrgRequestsAsync)
}
export function* fetchOrgPackages() {
    yield takeLatest(organizationTypes.FETCH_ORG_PACKAGES_START, fetchOrgPackagesAsync)
}
export function* fetchOrgMembers() {
    yield takeLatest(organizationTypes.FETCH_ORG_MEMBERS_START, fetchOrgMembersAsync)
}
export function* addItem() {
    yield takeEvery(organizationTypes.ADD_ORG_ITEMS_START, addItemAsync)
}
export function* removeItem() {
    yield takeEvery(organizationTypes.REMOVE_ORG_ITEMS_START, removeItemAsync)
}

export function* logoUpload() {
    yield takeEvery(organizationTypes.UPDATE_ORGANIZATION, updateSingleOrganizationAsync)
}
export function* fetchOrgCategories() {
    //GET /api/Item/GetRootItems
    yield takeEvery(organizationTypes.FETCH_ORG_CATEGORIES_START,fetchOrgCategoriesAsync)
}
export function* fetchOrgCampaign() {
    yield takeEvery(organizationTypes.FETCH_ORG_CAMPAIGNS_START, fetchOrgCampaignAsync);
}
export function* addCampaign() {
    yield takeEvery(organizationTypes.ADD_ORG_CAMPAIGN_START, addCampaignAsync)
}
export function* addPackage() {
    yield takeEvery(organizationTypes.ADD_ORG_PACKAGE_START, addPackageAsync)
}
export function* addAccount() {
    yield takeEvery(organizationTypes.ADD_ORG_ACCOUNT_START, addAccountAsync)
}
export function* addOffice() {
    yield takeEvery(organizationTypes.ADD_ORG_OFFICE_START, addOfficeAsync);
}
export function* fetchOrgAccounts() {
    yield takeEvery(organizationTypes.FETCH_ORG_ACCOUNTS_START, fetchOrgAccountsAsync);
}
export function* fetchOrgOffices() {
    yield takeEvery(organizationTypes.FETCH_ORG_OFFICES_START, fetchOrgOfficesAsync);
}
export function* fetchOrgAttachments() {
    yield takeEvery(organizationTypes.FETCH_ORG_ATTACHMENTS_START, fetchOrgAttachmentsAsync);
}
export function* addAttachments(){
    yield takeEvery(organizationTypes.ADD_ORG_ATTACHMENT_START, addAttachmentsAsync)
}
export function* addOrgRegion(){
    yield takeEvery(organizationTypes.ADD_ORG_REGION_START, addOrgRegionAsyn)
}
export function* fetchOrgRegions(){
    yield takeEvery(organizationTypes.FETCH_ORG_REGIONS_START, fetchOrgRegionsAsync)
}
export function* organizationSagas() {
    yield all([
        call(orgRequest),
        call(addOrganizationStart),
        call(addItem),
        call(addCampaign),
        call(addPackage),
        call(addOffice),
        call(addAttachments),
        call(addAccount),
        call(addOrgRegion),
        call(changeOrder),
        call(fetchOrganization),
        call(fetchOrgDetail),
        call(fetchOrgItems),
        call(fetchOrgRequests),
        call(fetchOrgPackages),
        call(fetchOrgMembers),
        call(fetchOrgCategories),
        call(fetchOrgCampaign),
        call(fetchOrgAccounts),
        call(fetchOrgOffices),
        call(fetchOrgAttachments),
        call(fetchOrgRegions),
        call(removeItem),
        call(logoUpload)

    ]);
}