import { takeLatest, all, call, put, select, takeEvery, takeLeading } from 'redux-saga/effects';
import { campaignTypes } from './campaign.types';
import { selectCurrentUser, selectUser } from "../user/user.selectors";
import { params } from '../../utility/request';
import {
    addCampaignSuccess, addCampaignFailure,
    updateCampaignFailure, updateCampaignSuccess,
    addPackageFailure, addPackageSuccess,
    addOfficeFailure,
    addOfficeSuccess,
    addAccountSuccess,
    addAccountFailure,
    addAttachmentFailure,
    addAttachmentSuccess,
    fetchAttachmentsStart,
    addCampaignRegionFailure,
    addCampaignRegionSuccess,
    fetchCampaignDetailStart,
    fetchCampaignStart,
    fetchCampaignSuccess,
    fetchCampaignDetailSuccess, fetchCampaignItemsSuccess,
    fetchCampaignRequestsSuccess,
    fetchCampaignPackagesSuccess,
    fetchCampaignPackagesStart,
    fetchCampaignCampaignsSuccess,
    fetchCampaignCategoriesSuccess,
    fetchCampaignCategoriesFailure,
    fetchCampaignMembersSuccess,
    fetchCampaignAccountsSuccess,
    fetchCampaignAccountsStart,
    fetchCampaignOfficesSuccess,
    fetchCampaignOfficesStart,
    fetchCampaignAttachmentsSuccess,
    fetchCampaignRegionsStart,
    fetchCampaignRegionsSuccess,
    requestSuccess, requestFailure,
    addCampaignItemSuccess, addCampaignItemFailure,
    removeCampaignItemSuccess, removeCampaignItemFailure
} from './campaign.actions';
import { apiLink } from '../api.links';
const url = apiLink;
export function* fetchCampaignAsync(action) {
    const user = yield select(selectUser);
    let q = "recordsPerPage=" + action.params.itemsCountPerPage
        + "&currentPage=" + action.params.activePage
        + "&orderDir=Asc"
        + "&calculateTotal=true"
        + "&disablePagination=false";
    if (action.params.name) {
        q += "&name=" + action.params.name
    }

    if (action.params.latitude) {
        q += "&latitude=" + action.params.latitude;
    } else {
        if (user.latitude)
            q += "&latitude=" + user.latitude;
    }
    if (action.params.longitude) {
        q += "&longitude=" + action.params.longitude;
    } else {
        if (user.longitude)
            q += "&longitude=" + user.longitude;
    }
    if (action.params && action.params.filters) {
        action.params.filters.forEach(filter => {
            if (filter.ByRegion) {
                let count = 0;
                filter.ByRegion.forEach(f => {

                    q += "&regions[" + count + "].regionLevel=" + f.RegionLevel;
                    q += "&regions[" + count + "].regionId=" + f.Id;
                    q += "&searchType=ByRegion";
                    count++;
                })
            }
            if (filter.Item) {
                let count = 0;
                filter.Item.forEach(f => {
                    q += "&rootCategories[" + count + "]=" + f.Id;
                    count++;
                })
            }
            if (filter.InRadius) {
                filter.InRadius.forEach(f => {
                    console.log(f);
                    q += "&radiusType=" + f.radiusType;
                    q += "&radius=" + f.radius;
                    q += "&searchType=InRadius";
                })
            }
            if (filter.Filter) {
                filter.Filter.forEach(f => {
                    q += "&searchType=" + f.Name;
                })

            }
            if (filter.ByMeOnly) {
                filter.ByMeOnly.forEach(f => {
                    q += "&fetchOwnedByMeOnly=" + f.Name;
                })

            }
        })
    } else {
        if (action.params.searchType) {
            q += "&searchType=" + action.params.searchType;
        } else {
            q += "&searchType=InMyRegion";
        }
    }

    try {
        const response = yield fetch(url + "/api/Campaign/GetPaginated?" + q, {
            method: "GET",
            //withCredentials: true,
            credentials: 'include',
            headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + user.currentUser.access_token },
            //credentials: "include"
        }).then(async (response) => {
            const result = await response.json();
            if (response.status >= 205) {
                return { result, error: true };
            }
            return {
                ok: true,
                result: result.Items,
                ...action.params,
                totalItemsCount: result.TotalCount
            };
        });
        if (response.ok) {
            yield put(fetchCampaignSuccess(response));
        }
    } catch (error) {
        alert(error);
    }
}
export function* fetchCampaignAccountsAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    let q = "recordsPerPage=" + action.params.itemsCountPerPage
        + "&campaignId=" + action.payload.id
        + "&currentPage=" + action.params.activePage
        + "&orderDir=Asc"
        + "&calculateTotal=true"
        + "&disablePagination=false";
    // if (action.params.name) {
    //     q += "&name=" + action.params.name
    // }
    //const q = "campaignId=" + action.payload.id + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    try {
        const response = yield fetch(url + "/api/CampaignAccount/GetPaginated?" + q, {
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
                ok: true,
                result: result.Items,
                ...action.params,
                totalItemsCount: result.TotalCount,
            };
        });
        if (response.ok) {
            yield put(fetchCampaignAccountsSuccess(response));
        }
    } catch (error) {
        alert(error);
    }
}
export function* fetchCampaignOfficesAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "campaignId=" + action.payload.id
        + "&recordsPerPage=" + action.params.itemsCountPerPage
        + "&currentPage=" + action.params.activePage
        + "&orderDir=Asc"
        + "&itemType=Package"
        + "&disablePagination=false";
    //const q = "campaignId=" + action.payload.id + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    try {
        const response = yield fetch(url + "/api/CampaignOffice/GetPaginated?" + q, {
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
                ok: true,
                result: result.Items,
                ...action.params,
                totalItemsCount: result.TotalCount,
            };
        });
        if (response.ok) {
            yield put(fetchCampaignOfficesSuccess(response));
        }
    } catch (error) {
        alert(error);
    }
}
export function* fetchCampaignAttachmentsAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "campaignId=" + action.payload.id
        + "&recordsPerPage=" + action.params.itemsCountPerPage
        + "&currentPage=" + action.params.activePage
        + "&orderDir=Asc"
        + "&itemType=Package"
        + "&disablePagination=false";
    //const q = "campaignId=" + action.payload.id + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    try {
        const response = yield fetch(url + "/api/CampaignAttachment/GetPaginated?" + q, {
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
                ok: true,
                result: result.Items,
                ...action.params,
                totalItemsCount: result.TotalCount,
            };
        });
        if (response.ok) {
            yield put(fetchCampaignAttachmentsSuccess(response));
        }
    } catch (error) {
        alert(error);
    }
}
export function* fetchCampaignRegionsAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "campaignId=" + action.payload.id
        + "&recordsPerPage=" + action.params.itemsCountPerPage
        + "&currentPage=" + action.params.activePage
        + "&orderDir=Asc"
        + "&itemType=Package"
        + "&disablePagination=false";
    //const q = "campaignId=" + action.payload.id + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    try {
        const response = yield fetch(url + "/api/CampaignRegion/GetPaginated?" + q, {
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
                ok: true,
                result: result.Items,
                ...action.params,
                totalItemsCount: result.TotalCount,
            };
        });
        if (response.ok) {
            yield put(fetchCampaignRegionsSuccess(response));
        }
    } catch (error) {
        alert(error);
    }
}
export function* addCampaignAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const campaign = yield fetch(url + "/api/Campaign/Create", {
            method: 'POST',
            ////withCredentials: true,
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
        if (campaign.error) {
            yield put(addCampaignFailure(campaign));
        } else {
            yield put(addCampaignSuccess({ campaign }));
            yield put(fetchCampaignStart(params));
        }
    } catch (error) {
        yield put(addCampaignFailure(error));
    }
}

export function* addPackageAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const campaign = yield fetch(url + "/api/CampaignPackage/Create", {
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
        if (campaign.error) {
            yield put(addPackageFailure(campaign));
        } else {
            yield put(fetchCampaignPackagesStart({ params, payload: action.payload.Campaign.Id }));
            yield put(addPackageSuccess({ campaign }));
        }
    } catch (error) {
        yield put(addPackageFailure(error));
    }
}
export function* addOfficeAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const campaign = yield fetch(url + "/api/CampaignOffice/Create", {
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
        if (campaign.error) {
            yield put(addOfficeFailure(campaign));
        } else {
            yield put(fetchCampaignOfficesStart({ params, payload: action.payload.Campaign.Id }));
            yield put(addOfficeSuccess({ campaign }));
        }
    } catch (error) {
        yield put(addOfficeFailure(error));
    }
}
export function* addAttachmentsAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const q = 'campaignId=' + action.payload.campaignId;//+'&attachments='+action.payload.attachments;
        const campaign = yield fetch(url + "/api/CampaignAttachment/Create?" + q, {
            method: 'PUT',
            //withCredentials: true,
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
        if (campaign.error) {
            yield put(addAttachmentFailure(campaign));
        } else {
            yield put(fetchAttachmentsStart({ params, payload: action.payload.campaignId }))
            yield put(addAttachmentSuccess({ campaign }));
        }
    } catch (error) {
        yield put(addAttachmentFailure(error));
    }
}
export function* addCampaignRegionAsyn(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const q = parseInt(action.payload.campaignId);//+'&attachments='+action.payload.attachments;
        const campaign = yield fetch(url + "/api/CampaignRegion/Modify", {
            method: 'POST',
            //withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + currentUser.access_token
            },
            body: JSON.stringify({ Regions: action.payload.regions, CampaignId: q })
        }).then(async (response) => {
            if (response.status >= 205) {
                const result = await response.json();
                return { result, error: true };
            }
            return response.json();
        });
        if (campaign.error) {
            yield put(addCampaignRegionFailure(campaign));
        } else {
            yield put(fetchCampaignRegionsStart({ id: action.payload.campaignId, params }));
            yield put(addCampaignRegionSuccess({ campaign }));
        }
    } catch (error) {
        yield put(addCampaignRegionFailure(error));
    }
}
export function* addAccountAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const campaign = yield fetch(url + "/api/CampaignAccount/Create", {
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
        if (campaign.error) {
            yield put(addAccountFailure(campaign));
        } else {
            yield put(fetchCampaignAccountsStart({ params, payload: action.payload.Campaign.Id }))
            yield put(addAccountSuccess({ campaign }));
        }
    } catch (error) {
        yield put(addAccountFailure(error));
    }
}
export function* updateSingleCampaignAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const campaign = yield fetch(url + "/api/Campaign/Update", {
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
        if (campaign.error) {
            yield put(addCampaignFailure(campaign));
        } else {
            yield put(addCampaignSuccess({ campaign }));
        }
    } catch (error) {
        yield put(addCampaignFailure(error));
    }
}
export function* updateCampaignAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const campaign = yield fetch(url + "/api/Campaign/Update", {
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
        if (campaign.error) {
            yield put(updateCampaignFailure(campaign));
        } else {
            yield put(updateCampaignSuccess({ campaign }));
            yield put(fetchCampaignDetailStart(action.payload.Id))
        }
    } catch (error) {
        yield put(updateCampaignFailure(error));
    }
}
export function* fetchCampaignDetailAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    try {
        const response = yield fetch(url + "/api/Campaign/Get/" + action.payload, {
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
            return { ok: true, result };
        });
        if (response.ok) {
            yield put(fetchCampaignDetailSuccess(response));
        }
    } catch (error) {

    }
}
export function* campaignRequestAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const campaign = yield fetch(url + "/api/CampaignMember/RequestMembership", {
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
        if (campaign.error) {
            yield put(requestFailure(campaign));
        } else {
            yield put(requestSuccess({ campaign }));
        }
    } catch (error) {
        yield put(requestFailure(error));
    }
}
export function* fetchCampaignItemsAsync(action) {
    //GET /api/CampaignItem/GetPaginated
    const currentUser = yield select(selectCurrentUser);
    const q = "campaignId=" + action.payload.id
        //+ "&organizationId="+action.payload.id.organization
        + "&recordsPerPage=" + action.params.itemsCountPerPage
        + "&currentPage=" + action.params.activePage
        + "&orderDir=Asc"
        //+ "&itemType=General"
        + "&calculateTotal=true"
        + "&disablePagination=false";
    //const q = "campaignId=" + action.payload.id + "&itemType=General&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    try {
        const response = yield fetch(url + "/api/CampaignItem/GetPaginated?" + q, {
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
                ok: true,
                result: result.Items,
                ...action.params,
                totalItemsCount: result.TotalCount,
            };
        });
        if (response.ok) {
            yield put(fetchCampaignItemsSuccess(response));
        }
    } catch (error) {
        alert(error);
    }
}
export function* fetchCampaignRequestsAsync(action) {

    const currentUser = yield select(selectCurrentUser);
    const q = "campaignId=" + action.payload.id
        + "&recordsPerPage=" + action.params.itemsCountPerPage
        + "&currentPage=" + action.params.activePage
        + "&orderDir=Asc"
        + "&calculateTotal=true"
        + "&disablePagination=false";
    try {
        const response = yield fetch(url + "/api/CampaignRequest/GetPaginated?" + q, {
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
                ok: true,
                result: result.Items,
                ...action.params,
                totalItemsCount: result.TotalCount,
                // activePage:action.payload.id.activePage,
                // itemsCountPerPage:action.payload.id.itemsCountPerPage,
                // pageRangeDisplayed:action.payload.id.pageRangeDisplayed
            };
        });
        if (response.ok) {
            yield put(fetchCampaignRequestsSuccess(response));
        }
    } catch (error) {
        alert(error);
    }
}
export function* fetchCampaignPackagesAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = "campaignId=" + action.payload.id
        + "&recordsPerPage=" + action.params.itemsCountPerPage
        + "&currentPage=" + action.params.activePage
        + "&orderDir=Asc"
        + "&itemType=Package"
        + "&disablePagination=false";
    //const q = "campaignId=" + action.payload.id + "&itemType=Package&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    try {
        const response = yield fetch(url + "/api/CampaignItem/GetPaginated?" + q, {
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
                ok: true,
                result: result.Items,
                ...action.params,
                totalItemsCount: result.TotalCount,
            };
        });
        if (response.ok) {
            yield put(fetchCampaignPackagesSuccess(response));
        }
    } catch (error) {
        alert(error);
    }
}
export function* fetchCampaignMembersAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    let q = "campaignId=" + action.payload.id
        + "&recordsPerPage=" + action.params.itemsCountPerPage
        + "&currentPage=" + action.params.activePage
        + "&orderDir=Asc"
        + "&type=" + action.userType
        + "&disablePagination=false";
    //const q = "campaignId=" + action.payload.id + "&type=" + action.userType + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    try {
        const response = yield fetch(url + "/api/CampaignMember/GetPaginated?" + q, {
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
                ok: true,
                result: result.Items,
                ...action.params,
                totalItemsCount: result.TotalCount,
            };
        });
        if (response.ok) {
            yield put(fetchCampaignMembersSuccess(response));
        }
    } catch (error) {
        alert(error);
    }
}
export function* fetchCampaignCategoriesAsync(action) {
    const currentUser = yield select(selectCurrentUser);
    const q = action.payload.id;//"campaignId="+action.payload.id+"&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
    try {
        const response = yield fetch(url + "/api/Campaign/GetCategories/" + q, {
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
            return { ok: true, result };
        });
        if (response.ok) {
            yield put(fetchCampaignCategoriesSuccess(response.result));
        }
    } catch (error) {
        yield put(fetchCampaignCategoriesFailure(error))
    }

}

export function* addItemAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const campaign = yield fetch(url + "/api/CampaignItem/Modify", {
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
        if (campaign.error) {
            yield put(addCampaignItemFailure({ campaign, request: action.payload }));
        } else {
            yield put(addCampaignItemSuccess({ campaign, request: action.payload }));
        }
    } catch (error) {
        yield put(addCampaignItemFailure({ error, request: action.payload }));
    }
}
export function* toggleFilterAsync(action) {

}
export function* removeItemAsync(action) {
    try {
        const currentUser = yield select(selectCurrentUser);
        const q = "campaignId=" + action.payload.campaignId + "&itemId=" + action.payload.itemId;
        const campaign = yield fetch(url + "/api/CampaignItem/DeleteCampaignItem?" + q, {
            method: 'DELETE',
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
        if (campaign.error) {
            yield put(removeCampaignItemFailure({ campaign, request: action.payload }));
        } else {
            yield put(removeCampaignItemSuccess({ campaign, request: action.payload }));
        }
    } catch (error) {
        yield put(removeCampaignItemFailure({ error, request: action.payload }));
    }
}
export function* addCampaignStart() {
    yield takeLatest(campaignTypes.ADD_CAMPAIGN_START, addCampaignAsync)
}
export function* updateCampaign() {
    yield takeLatest(campaignTypes.UPDATE_CAMPAIGN_START, updateCampaignAsync)
}
export function* changeOrder() {
    yield takeEvery(campaignTypes.CAMPAIGN_ORDER_CHANGED, updateCampaignAsync)
}
export function* fetchCampaign() {
    yield takeLatest(campaignTypes.FETCH_CAMPAIGN_START, fetchCampaignAsync);
}
export function* campaignRequest() {
    yield takeLatest(campaignTypes.CAMPAIGN_REQUEST_START, campaignRequestAsync)
}

export function* fetchCampaignItems() {
    yield takeLeading(campaignTypes.FETCH_CAMPAIGN_ITEMS_START, fetchCampaignItemsAsync);
}
export function* fetchCampaignRequests() {
    yield takeLatest(campaignTypes.FETCH_CAMPAIGN_REQUESTS_START, fetchCampaignRequestsAsync)
}
export function* fetchCampaignPackages() {
    yield takeLatest(campaignTypes.FETCH_CAMPAIGN_PACKAGES_START, fetchCampaignPackagesAsync)
}
export function* fetchCampaignMembers() {
    yield takeLatest(campaignTypes.FETCH_CAMPAIGN_MEMBERS_START, fetchCampaignMembersAsync)
}
export function* addItem() {
    yield takeEvery(campaignTypes.ADD_CAMPAIGN_ITEMS_START, addItemAsync)
}
export function* removeItem() {
    yield takeEvery(campaignTypes.REMOVE_CAMPAIGN_ITEMS_START, removeItemAsync)
}

export function* logoUpload() {
    yield takeEvery(campaignTypes.UPDATE_CAMPAIGN, updateSingleCampaignAsync)
}
export function* fetchCampaignCategories() {
    //GET /api/Item/GetRootItems
    yield takeEvery(campaignTypes.FETCH_CAMPAIGN_CATEGORIES_START, fetchCampaignCategoriesAsync)
}
export function* addCampaign() {
    yield takeEvery(campaignTypes.ADD_CAMPAIGN_CAMPAIGN_START, addCampaignAsync)
}
export function* addPackage() {
    yield takeEvery(campaignTypes.ADD_CAMPAIGN_PACKAGE_START, addPackageAsync)
}
export function* addAccount() {
    yield takeEvery(campaignTypes.ADD_CAMPAIGN_ACCOUNT_START, addAccountAsync)
}
export function* addOffice() {
    yield takeEvery(campaignTypes.ADD_CAMPAIGN_OFFICE_START, addOfficeAsync);
}
export function* fetchCampaignAccounts() {
    yield takeEvery(campaignTypes.FETCH_CAMPAIGN_ACCOUNTS_START, fetchCampaignAccountsAsync);
}
export function* fetchCampaignOffices() {
    yield takeEvery(campaignTypes.FETCH_CAMPAIGN_OFFICES_START, fetchCampaignOfficesAsync);
}
export function* fetchCampaignAttachments() {
    yield takeEvery(campaignTypes.FETCH_CAMPAIGN_ATTACHMENTS_START, fetchCampaignAttachmentsAsync);
}
export function* addAttachments() {
    yield takeEvery(campaignTypes.ADD_CAMPAIGN_ATTACHMENT_START, addAttachmentsAsync)
}
export function* addCampaignRegion() {
    yield takeEvery(campaignTypes.ADD_CAMPAIGN_REGION_START, addCampaignRegionAsyn)
}
export function* fetchCampaignRegions() {
    yield takeEvery(campaignTypes.FETCH_CAMPAIGN_REGIONS_START, fetchCampaignRegionsAsync)
}
export function* toggleFilter() {
    yield takeEvery(campaignTypes.TOGGLE_FILTER, toggleFilterAsync)
}
export function* fetchCampaignDetail() {
    yield takeEvery(campaignTypes.FETCH_CAMPAIGN_DETAIL, fetchCampaignDetailAsync)
}
export function* campaignSagas() {
    yield all([
        call(campaignRequest),
        call(addCampaignStart),
        call(updateCampaign),
        call(addItem),
        call(addCampaign),
        call(addPackage),
        call(addOffice),
        call(addAttachments),
        call(addAccount),
        call(addCampaignRegion),
        call(changeOrder),
        call(fetchCampaign),
        call(fetchCampaignDetail),
        call(fetchCampaignItems),
        call(fetchCampaignRequests),
        call(fetchCampaignPackages),
        call(fetchCampaignMembers),
        call(fetchCampaignCategories),
        call(fetchCampaignAccounts),
        call(fetchCampaignOffices),
        call(fetchCampaignAttachments),
        call(fetchCampaignRegions),
        call(removeItem),
        call(logoUpload),
        call(toggleFilter)
    ]);
}