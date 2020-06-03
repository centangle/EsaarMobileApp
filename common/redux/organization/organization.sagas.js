import {
  takeLatest,
  all,
  call,
  put,
  select,
  takeEvery,
  takeLeading,
} from "redux-saga/effects";
import { organizationTypes } from "./organization.types";
import { selectCurrentUser, selectUser } from "../user/user.selectors";
import { params } from "../../utility/request";
import { createBrowserHistory } from "history";

import {
  addOrganizationSuccess,
  addOrganizationFailure,
  updateOrganizationFailure,
  updateOrganizationSuccess,
  addCampaignSuccess,
  addCampaignFailure,
  addPackageFailure,
  addPackageSuccess,
  addOfficeFailure,
  addOfficeSuccess,
  addAccountSuccess,
  addAccountFailure,
  addAttachmentFailure,
  addAttachmentSuccess,
  fetchAttachmentsStart,
  addOrgRegionFailure,
  addOrgRegionSuccess,
  fetchOrganizationDetail,
  fetchOrganizationStart,
  fetchOrgMembersDDSuccess,
  fetchOrganizationSuccess,
  fetchOrgDetailSuccess,
  fetchOrgItemsSuccess,
  fetchOrgRequestsSuccess,
  fetchOrgPackagesSuccess,
  fetchOrgPackagesStart,
  fetchOrgCampaignsSuccess,
  fetchOrgCategoriesSuccess,
  fetchOrgMembersSuccess,
  fetchOrgAccountsSuccess,
  fetchOrgAccountsStart,
  fetchOrgOfficesSuccess,
  fetchOrgOfficesStart,
  fetchOrgAttachmentsSuccess,
  fetchOrgRegionsSuccess,
  fetchOrgRegionsStart,
  requestSuccess,
  requestFailure,
  addOrgItemSuccess,
  addOrgItemFailure,
  removeOrgItemSuccess,
  removeOrgItemFailure,
  redirect,
} from "./organization.actions";
import { apiLink } from "../api.links";
const url = apiLink;
export function* fetchOrganizationAsync(action) {
  const user = yield select(selectUser);
  let q =
    "recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Asc" +
    "&calculateTotal=true" +
    "&disablePagination=false";
  if (action.params.name) {
    q += "&name=" + action.params.name;
  }

  if (action.params.latitude) {
    q += "&latitude=" + action.params.latitude;
  } else {
    if (user.latitude) q += "&latitude=" + user.latitude;
  }
  if (action.params.longitude) {
    q += "&longitude=" + action.params.longitude;
  } else {
    if (user.longitude) q += "&longitude=" + user.longitude;
  }
  let searching = [];
  if (action.params && action.params.filters) {
    action.params.filters.forEach((filter) => {
      if (filter.ByRegion) {
        let count = 0;
        filter.ByRegion.forEach((f) => {
          q += "&regions[" + count + "].regionLevel=" + f.RegionLevel;
          q += "&regions[" + count + "].regionId=" + f.Id;
          q += "&searchType=ByRegion";
          count++;
          searching.push(["ByRegion"]);
        });
      }
      if (filter.Item) {
        let count = 0;
        filter.Item.forEach((f) => {
          q += "&rootCategories[" + count + "]=" + f.Id;
          count++;
        });
      }
      if (filter.InRadius) {
        filter.InRadius.forEach((f) => {
          q += "&radiusType=" + f.radiusType;
          q += "&radius=" + f.radius;
          q += "&searchType=InRadius";
          searching.push(["InRadius"]);
        });
      }
      if (filter.Filter) {
        filter.Filter.forEach((f) => {
          q += "&searchType=" + f.Name;
        });
      }
      if (filter.ByMeOnly) {
        filter.ByMeOnly.forEach((f) => {
          q += "&fetchOwnedByMeOnly=" + f.Name;
        });
      }
    });
    if (searching.length < 1) {
      q += "&searchType=InMyRegion";
    }
  } else {
    if (action.params.searchType) {
      q += "&searchType=" + action.params.searchType;
    } else {
      q += "&searchType=InMyRegion";
    }
  }

  try {
    const response = yield fetch(url + "/api/Organization/GetPaginated?" + q, {
      method: "GET",
      //withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + user.currentUser.access_token,
      },
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
      yield put(fetchOrganizationSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchOrgAccountsAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  let q =
    "recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&organizationId=" +
    action.payload +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Asc" +
    "&calculateTotal=true" +
    "&disablePagination=false";
  // if (action.params.name) {
  //     q += "&name=" + action.params.name
  // }
  //const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  try {
    const response = yield fetch(
      url + "/api/OrganizationAccount/GetPaginated?" + q,
      {
        method: "GET",
        //withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        //credentials: "include"
      }
    ).then(async (response) => {
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
      yield put(fetchOrgAccountsSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchOrgOfficesAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const q =
    "organizationId=" +
    action.payload +
    "&recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Asc" +
    "&itemType=Package" +
    "&disablePagination=false";
  //const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  try {
    const response = yield fetch(
      url + "/api/OrganizationOffice/GetPaginated?" + q,
      {
        method: "GET",
        //withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        //credentials: "include"
      }
    ).then(async (response) => {
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
      yield put(fetchOrgOfficesSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchOrgAttachmentsAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const q =
    "organizationId=" +
    action.payload +
    "&recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Asc" +
    "&itemType=Package" +
    "&disablePagination=false";
  //const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  try {
    const response = yield fetch(
      url + "/api/OrganizationAttachment/GetPaginated?" + q,
      {
        method: "GET",
        //withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        //credentials: "include"
      }
    ).then(async (response) => {
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
      yield put(fetchOrgAttachmentsSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchOrgRegionsAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const q =
    "organizationId=" +
    action.payload +
    "&recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Asc" +
    "&itemType=Package" +
    "&disablePagination=false";
  //const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  try {
    const response = yield fetch(
      url + "/api/OrganizationRegion/GetPaginated?" + q,
      {
        method: "GET",
        //withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        //credentials: "include"
      }
    ).then(async (response) => {
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
      yield put(fetchOrgRegionsSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* addOrganizationAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const organization = yield fetch(url + "/api/Organization/Create", {
      method: "POST",
      ////withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + currentUser.access_token,
      },
      body: JSON.stringify(action.payload),
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
      yield redirect("/organizations/" + organization);
      //yield put(fetchOrganizationStart(params));
    }
  } catch (error) {
    yield put(addOrganizationFailure(error));
  }
}
export function* addCampaignAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const organization = yield fetch(url + "/api/Campaign/Create", {
      method: "POST",
      //withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + currentUser.access_token,
      },
      body: JSON.stringify(action.payload),
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
      yield redirect("/campaigns/" + organization);
    }
  } catch (error) {
    yield put(addCampaignFailure(error));
  }
}
export function* addPackageAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const organization = yield fetch(url + "/api/OrganizationPackage/Create", {
      method: "POST",
      //withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + currentUser.access_token,
      },
      body: JSON.stringify(action.payload),
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
      yield put(
        fetchOrgPackagesStart({
          params,
          payload: action.payload.Organization.Id,
        })
      );
      yield put(addPackageSuccess({ organization }));
    }
  } catch (error) {
    yield put(addPackageFailure(error));
  }
}
export function* addOfficeAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const organization = yield fetch(url + "/api/OrganizationOffice/Create", {
      method: "POST",
      //withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + currentUser.access_token,
      },
      body: JSON.stringify(action.payload),
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
      yield put(
        fetchOrgOfficesStart({
          params,
          payload: action.payload.Organization.Id,
        })
      );
      yield put(addOfficeSuccess({ organization }));
    }
  } catch (error) {
    yield put(addOfficeFailure(error));
  }
}
export function* addAttachmentsAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId=" + action.payload.organizationId; //+'&attachments='+action.payload.attachments;
    const organization = yield fetch(
      url + "/api/OrganizationAttachment/Create?" + q,
      {
        method: "PUT",
        //withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        body: JSON.stringify(action.payload.attachments),
      }
    ).then(async (response) => {
      if (response.status >= 205) {
        const result = await response.json();
        return { result, error: true };
      }
      return response.json();
    });
    if (organization.error) {
      yield put(addAttachmentFailure(organization));
    } else {
      yield put(
        fetchAttachmentsStart({
          params,
          payload: action.payload.organizationId,
        })
      );
      yield put(addAttachmentSuccess({ organization }));
    }
  } catch (error) {
    yield put(addAttachmentFailure(error));
  }
}
export function* addOrgRegionAsyn(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const q = "organizationId=" + action.payload.organizationId; //+'&attachments='+action.payload.attachments;
    const organization = yield fetch(
      url + "/api/OrganizationRegion/Modify?" + q,
      {
        method: "POST",
        //withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        body: JSON.stringify(action.payload.regions),
      }
    ).then(async (response) => {
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
      yield put(
        fetchOrgRegionsStart({ payload: action.payload.organizationId, params })
      );
    }
  } catch (error) {
    yield put(addOrgRegionFailure(error));
  }
}
export function* addAccountAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const organization = yield fetch(url + "/api/OrganizationAccount/Create", {
      method: "POST",
      //withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + currentUser.access_token,
      },
      body: JSON.stringify(action.payload),
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
      yield put(
        fetchOrgAccountsStart({
          params,
          payload: action.payload.Organization.Id,
        })
      );
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
      method: "PUT",
      //withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + currentUser.access_token,
      },
      body: JSON.stringify(action.payload),
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
    const organization = yield fetch(url + "/api/Organization/Update", {
      method: "PUT",
      //withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + currentUser.access_token,
      },
      body: JSON.stringify(action.payload),
    }).then(async (response) => {
      if (response.status >= 205) {
        const result = await response.json();
        return { result, error: true };
      }
      return response.json();
    });
    if (organization.error) {
      yield put(updateOrganizationFailure(organization));
    } else {
      yield put(updateOrganizationSuccess({ organization }));
      yield put(fetchOrganizationDetail(action.payload.Id));
    }
  } catch (error) {
    yield put(updateOrganizationFailure(error));
  }
}
export function* fetchOrgDetailAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  try {
    const response = yield fetch(
      url + "/api/Organization/Get/" + action.payload,
      {
        method: "GET",
        //withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        //credentials: "include"
      }
    ).then(async (response) => {
      const result = await response.json();
      if (response.status >= 205) {
        return { result, error: true };
      }
      return { ok: true, result };
    });
    if (response.ok) {
      yield put(fetchOrgDetailSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* orgRequestAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const organization = yield fetch(
      url + "/api/OrganizationMember/RequestMembership",
      {
        method: "POST",
        //withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        body: JSON.stringify(action.payload),
      }
    ).then(async (response) => {
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
  let q =
    "organizationId=" +
    action.payload +
    "&recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Asc" +
    "&itemType=General" +
    "&calculateTotal=true" +
    "&disablePagination=false";
  if (action.params.itemName) {
    q += "&itemName=" + action.params.itemName;
  }
  //const q = "organizationId=" + action.payload + "&itemType=General&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  try {
    const response = yield fetch(
      url + "/api/OrganizationItem/GetPaginated?" + q,
      {
        method: "GET",
        //withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        //credentials: "include"
      }
    ).then(async (response) => {
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
      yield put(fetchOrgItemsSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchOrgRequestsAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const q =
    "organizationId=" +
    action.payload +
    "&recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Asc" +
    "&calculateTotal=true" +
    "&disablePagination=false";
  try {
    const response = yield fetch(
      url + "/api/OrganizationRequest/GetPaginated?" + q,
      {
        method: "GET",
        //withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        //credentials: "include"
      }
    ).then(async (response) => {
      const result = await response.json();
      if (response.status >= 205) {
        return { result, error: true };
      }
      return {
        ok: true,
        result: result.Items,
        ...action.params,
        totalItemsCount: result.TotalCount,
        // activePage:action.payload.activePage,
        // itemsCountPerPage:action.payload.itemsCountPerPage,
        // pageRangeDisplayed:action.payload.pageRangeDisplayed
      };
    });
    if (response.ok) {
      yield put(fetchOrgRequestsSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchOrgPackagesAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const q =
    "organizationId=" +
    action.payload +
    "&recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Asc" +
    "&itemType=Package" +
    "&disablePagination=false";
  //const q = "organizationId=" + action.payload + "&itemType=Package&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  try {
    const response = yield fetch(
      url + "/api/OrganizationItem/GetPaginated?" + q,
      {
        method: "GET",
        //withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        //credentials: "include"
      }
    ).then(async (response) => {
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
      yield put(fetchOrgPackagesSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchOrgMembersAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  let q =
    "organizationId=" +
    action.payload +
    "&recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Asc" +
    "&type=" +
    action.userType +
    "&disablePagination=false";
  //const q = "organizationId=" + action.payload + "&type=" + action.userType + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  try {
    const response = yield fetch(
      url + "/api/OrganizationMember/GetPaginated?" + q,
      {
        method: "GET",
        //withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        //credentials: "include"
      }
    ).then(async (response) => {
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
      yield put(fetchOrgMembersSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchOrgCategoriesAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const q = action.payload; //"organizationId="+action.payload+"&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  try {
    const response = yield fetch(url + "/api/Organization/GetCategories/" + q, {
      method: "GET",
      //withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + currentUser.access_token,
      },
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
  } catch (error) {
    alert(error);
  }
}
export function* fetchOrgCampaignAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const q =
    "organizationId=" +
    action.payload +
    "&recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Asc" +
    "&calculateTotal=true" +
    "&disablePagination=false";
  //const q = "organizationId=" + action.payload + "&recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  try {
    const response = yield fetch(url + "/api/Campaign/GetPaginated?" + q, {
      method: "GET",
      //withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + currentUser.access_token,
      },
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
      yield put(fetchOrgCampaignsSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* addItemAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const organization = yield fetch(url + "/api/OrganizationItem/Create", {
      method: "POST",
      //withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + currentUser.access_token,
      },
      body: JSON.stringify(action.payload),
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
export function* toggleFilterAsync(action) {}
export function* removeItemAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const q =
      "organizationId=" +
      action.payload.organizationId +
      "&itemId=" +
      action.payload.itemId;
    const organization = yield fetch(
      url + "/api/OrganizationItem/DeleteOrganizationItem?" + q,
      {
        method: "DELETE",
        //withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
        body: JSON.stringify(action.payload),
      }
    ).then(async (response) => {
      if (response.status >= 205) {
        const result = await response.json();
        return { result, error: true };
      }
      return response.json();
    });
    if (organization.error) {
      yield put(
        removeOrgItemFailure({ organization, request: action.payload })
      );
    } else {
      yield put(
        removeOrgItemSuccess({ organization, request: action.payload })
      );
    }
  } catch (error) {
    yield put(removeOrgItemFailure({ error, request: action.payload }));
  }
}
export function* fetchOrgMembersDDAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const q =
      "organizationId=" +
      action.payload.organizationId +
      "&memberName=" +
      action.payload.memberName +
      "&type=" +
      action.payload.type;
    const organization = yield fetch(
      url + "/api/OrganizationMember/GetOrganizationMembersForDD?" + q,
      {
        method: "GET",
        //withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + currentUser.access_token,
        },
      }
    ).then(async (response) => {
      if (response.status >= 205) {
        const result = await response.json();
        return { result, error: true };
      }
      return response.json();
    });
    if (organization.error) {
      console.log(organization);
    } else {
      yield put(
        fetchOrgMembersDDSuccess({ ...action.payload, ...organization })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
export function* addOrganizationStart() {
  yield takeEvery(
    organizationTypes.ADD_ORGANIZATION_START,
    addOrganizationAsync
  );
}
export function* updateOrganization() {
  yield takeEvery(
    organizationTypes.UPDATE_ORGANIZATION_START,
    updateOrganizationAsync
  );
}
export function* changeOrder() {
  yield takeEvery(
    organizationTypes.ORGANIZATION_ORDER_CHANGED,
    updateOrganizationAsync
  );
}
export function* fetchOrganization() {
  yield takeEvery(
    organizationTypes.FETCH_ORGANIZATION_START,
    fetchOrganizationAsync
  );
}
export function* orgRequest() {
  yield takeEvery(organizationTypes.REQUEST_START, orgRequestAsync);
}
export function* fetchOrgDetail() {
  yield takeEvery(organizationTypes.FETCH_ORG_DETAIL, fetchOrgDetailAsync);
}
export function* fetchOrgItems() {
  yield takeEvery(organizationTypes.FETCH_ORG_ITEMS_START, fetchOrgItemsAsync);
}
export function* fetchOrgRequests() {
  yield takeEvery(
    organizationTypes.FETCH_ORG_REQUESTS_START,
    fetchOrgRequestsAsync
  );
}
export function* fetchOrgPackages() {
  yield takeEvery(
    organizationTypes.FETCH_ORG_PACKAGES_START,
    fetchOrgPackagesAsync
  );
}
export function* fetchOrgMembers() {
  yield takeEvery(
    organizationTypes.FETCH_ORG_MEMBERS_START,
    fetchOrgMembersAsync
  );
}
export function* addItem() {
  yield takeEvery(organizationTypes.ADD_ORG_ITEMS_START, addItemAsync);
}
export function* removeItem() {
  yield takeEvery(organizationTypes.REMOVE_ORG_ITEMS_START, removeItemAsync);
}

export function* logoUpload() {
  yield takeEvery(
    organizationTypes.UPDATE_ORGANIZATION,
    updateSingleOrganizationAsync
  );
}
export function* fetchOrgCategories() {
  //GET /api/Item/GetRootItems
  yield takeEvery(
    organizationTypes.FETCH_ORG_CATEGORIES_START,
    fetchOrgCategoriesAsync
  );
}
export function* fetchOrgCampaign() {
  yield takeEvery(
    organizationTypes.FETCH_ORG_CAMPAIGNS_START,
    fetchOrgCampaignAsync
  );
}
export function* addCampaign() {
  yield takeEvery(organizationTypes.ADD_ORG_CAMPAIGN_START, addCampaignAsync);
}
export function* addPackage() {
  yield takeEvery(organizationTypes.ADD_ORG_PACKAGE_START, addPackageAsync);
}
export function* addAccount() {
  yield takeEvery(organizationTypes.ADD_ORG_ACCOUNT_START, addAccountAsync);
}
export function* addOffice() {
  yield takeEvery(organizationTypes.ADD_ORG_OFFICE_START, addOfficeAsync);
}
export function* fetchOrgAccounts() {
  yield takeEvery(
    organizationTypes.FETCH_ORG_ACCOUNTS_START,
    fetchOrgAccountsAsync
  );
}
export function* fetchOrgOffices() {
  yield takeEvery(
    organizationTypes.FETCH_ORG_OFFICES_START,
    fetchOrgOfficesAsync
  );
}
export function* fetchOrgAttachments() {
  yield takeEvery(
    organizationTypes.FETCH_ORG_ATTACHMENTS_START,
    fetchOrgAttachmentsAsync
  );
}
export function* addAttachments() {
  yield takeEvery(
    organizationTypes.ADD_ORG_ATTACHMENT_START,
    addAttachmentsAsync
  );
}
export function* addOrgRegion() {
  yield takeEvery(organizationTypes.ADD_ORG_REGION_START, addOrgRegionAsyn);
}
export function* fetchOrgRegions() {
  yield takeEvery(
    organizationTypes.FETCH_ORG_REGIONS_START,
    fetchOrgRegionsAsync
  );
}
export function* toggleFilter() {
  yield takeEvery(organizationTypes.TOGGLE_FILTER, toggleFilterAsync);
}
export function* fetchOrgMembersDD() {
  yield takeEvery("OPEN_REPLY_MODAL", fetchOrgMembersDDAsync);
}
export function* organizationSagas() {
  yield all([
    call(orgRequest),
    call(addOrganizationStart),
    call(updateOrganization),
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
    call(logoUpload),
    call(toggleFilter),
    call(fetchOrgMembersDD),
  ]);
}
