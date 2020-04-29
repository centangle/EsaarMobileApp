import { takeLatest, all, call, put, select, takeEvery } from 'redux-saga/effects';
import { regionTypes } from './region.types';
import { selectCurrentUser } from "../user/user.selectors";
import {
  fetchRegionLevelSuccess,
  fetchStatesSuccess,
  fetchDistrictsSuccess,
  fetchTehsilsSuccess,
  fetchUcsSuccess,
  fetchCountriesSuccess, addRegionSuccess, addRegionFailure,
  fetchRegionSuccess, fetchRegionDetailSuccess
} from './region.actions';
import { apiLink } from '../api.links';
const url = apiLink;
export function* fetchRegionAsync() {
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Region/GetAllRegions?dataStructure=Tree", {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return { ok: true, result };
  });
  if (response.ok) {
    yield put(fetchRegionSuccess(response));
  }
}
export function* fetchRegionLevelAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const urlPart = action.payload.isOrganizationRegion?"/api/OrganizationRegion/Levels?organizationId="+action.payload.organizationId:"/api/Region/Levels";
  const response = yield fetch(url + urlPart, {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return { ok: true, result };
  });
  if (response.ok) {
    yield put(fetchRegionLevelSuccess(response));
  }
}
export function* fetchCountriesAsync(action) {
  let q = "recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  if (action.payload.isOrganizationRegion) {
    q += "&organizationId=" + action.payload.organizationId;
  }
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Region/Countries?" + q, {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return { ok: true, result: result.Items };
  });
  if (response.ok) {
    yield put(fetchCountriesSuccess(response));
  }
}
export function* fetchStatesAsync(action) {
  let q = "recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  if (action.payload.countryId) {
    q += "&countryId=" + action.payload.countryId;
  }
  if (action.payload.isOrganizationRegion) {
    q += "&organizationId=" + action.payload.organizationId;
  }
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Region/States?" + q, {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return { ok: true, result: result.Items };
  });
  if (response.ok) {
    yield put(fetchStatesSuccess(response));
  }
}
export function* fetchDistrictsAsync(action) {
  let q = "recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  if (action.payload.stateId) {
    q += "&stateId=" + action.payload.stateId;
  }
  if (action.payload.isOrganizationRegion) {
    q += "&organizationId=" + action.payload.organizationId;
  }
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Region/Districts?" + q, {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return { ok: true, result: result.Items };
  });
  if (response.ok) {
    yield put(fetchDistrictsSuccess(response));
  }
}
export function* fetchTehsilsAsync(action) {
  let q = "recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  if (action.payload.districtId) {
    q += "&districtId=" + action.payload.districtId;
  }
  if (action.payload.isOrganizationRegion) {
    q += "&organizationId=" + action.payload.organizationId;
  }
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Region/Tehsils?" + q, {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return { ok: true, result: result.Items };
  });
  if (response.ok) {
    yield put(fetchTehsilsSuccess(response));
  }
}
export function* fetchUcsAsync(action) {
  let q = "recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  if (action.payload.tehsilId) {
    q += "&tehsilId=" + action.payload.tehsilId;
  }
  if (action.payload.isOrganizationRegion) {
    q += "&organizationId=" + action.payload.organizationId;
  }
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Region/UnionCouncils?" + q, {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return { ok: true, result: result.Items };
  });
  if (response.ok) {
    yield put(fetchUcsSuccess(response));
  }
}
export function* fetchRegionDetailAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const response = yield fetch(url + "/api/Region/Get" + action.payload.id, {
    method: "GET",
    withCredentials: true,
    credentials: 'include',
    headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
  }).then(async (response) => {
    const result = await response.json();
    if (response.status >= 205) {
      return { result, error: true };
    }
    return { ok: true, result };
  });
  if (response.ok) {
    yield put(fetchRegionDetailSuccess(response));
  }
}
export function* addRegionAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const region = yield fetch(url + "/api/Region/Create", {
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
    if (region.error) {
      yield put(addRegionFailure(region));
    } else {
      yield put(addRegionSuccess({ region }));
    }
  } catch (error) {
    yield put(addRegionFailure(error));
  }
}
export function* updateRegionAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const region = yield fetch(url + "/api/Region/UpdateMultipleRegionsWithChildrens", {
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
    if (region.error) {
      yield put(addRegionFailure(region));
    } else {
      yield put(addRegionSuccess({ region }));
    }
  } catch (error) {
    yield put(addRegionFailure(error));
  }
}
export function* addRegionStart() {
  yield takeEvery(regionTypes.ADD_REGION_START, addRegionAsync)
}
export function* changeOrder() {
  yield takeEvery(regionTypes.REGION_ORDER_CHANGED, updateRegionAsync)
}
export function* fetchRegion() {
  yield takeLatest(regionTypes.FETCH_REGION_START, fetchRegionAsync);
}
export function* fetchRegionDetail() {
  yield takeLatest(regionTypes.FETCH_REGION_DETAIL, fetchRegionDetailAsync);
}
export function* fetchRegionLevel() {
  yield takeLatest(regionTypes.FETCH_REGION_LEVELS_START, fetchRegionLevelAsync);
}
export function* fetchCountries() {
  yield takeLatest(regionTypes.FETCH_COUNTRIES_START, fetchCountriesAsync);
}
export function* fetchStates(){
  yield takeLatest(regionTypes.FETCH_STATES_START, fetchStatesAsync);
}
export function* fetchDistricts(){
  yield takeLatest(regionTypes.FETCH_DISTRICTS_START, fetchDistrictsAsync);
}
export function* fetchTehsils(){
  yield takeLatest(regionTypes.FETCH_TEHSILS_START, fetchTehsilsAsync);
}
export function* fetchUcs(){
  yield takeLatest(regionTypes.FETCH_UCS_START, fetchUcsAsync);
}
export function* regionSagas() {
  yield all([
    call(fetchRegionLevel),
    call(fetchCountries),
    call(fetchStates),
    call(fetchDistricts),
    call(fetchTehsils),
    call(fetchUcs),
  ]);
}