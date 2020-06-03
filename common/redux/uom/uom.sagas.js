import { takeLatest, all, call, put, select, takeEvery } from 'redux-saga/effects';
import { uomTypes } from './uom.types';
import { selectCurrentUser } from "../user/user.selectors";
import {
  addUomSuccess, addUomFailure,
  updateUomFailure, updateUomSuccess,
  removeUomFailure,
  removeUomSuccess, fetchUomSuccess, fetchUomDetailSuccess,
  fetchPeriferalUomSuccess, fetchUomStart
} from './uom.actions';
import { apiLink } from '../api.links';
import { parse } from 'date-fns';
const url = apiLink;

export function* fetchUomTreeAsync() {
  const currentUser = yield select(selectCurrentUser);
  try {
    const response = yield fetch(url + "/api/UOM/GetAllUOMs?dataStructure=List", {
      method: "GET",
      //withCredentials: true,
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
      yield put(fetchUomSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* removeUomAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  try {
    const response = yield fetch(url + "/api/UOM/DeleteUOMWithChildren/" + action.payload, {
      method: "DELETE",
      //withCredentials: true,
      credentials: 'include',
      headers: { "Content-Type": "application/json", 'Authorization': 'bearer ' + currentUser.access_token },
    }).then(async (response) => {
      const result = await response.json();
      if (response.status >= 205) {
        return { result, error: true };
      }
      return { ok: true, result: result, Id: action.payload };
    });
    if (response.ok) {
      yield put(fetchUomStart())
      yield put(removeUomSuccess(response));
    } else {
      yield put(removeUomFailure(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchUomAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const dd = action.payload ? action.payload : false;
  try {
    const response = yield fetch(url + "/api/UOM/Get?forDropDown=" + dd, {
      method: "GET",
      //withCredentials: true,
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
      yield put(fetchUomSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchPeriferalUomAsync() {
  const currentUser = yield select(selectCurrentUser);
  try {
    const response = yield fetch(url + "/api/Uom/GetPeripheralUoms", {
      method: "GET",
      //withCredentials: true,
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
      yield put(fetchPeriferalUomSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}

export function* fetchUomDetailAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  try {
    const response = yield fetch(url + "/api/Uom/Get" + action.payload.id, {
      method: "GET",
      //withCredentials: true,
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
      yield put(fetchUomDetailSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* addUomAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const uom = yield fetch(url + "/api/UOM/Create", {
      method: 'POST',
      //withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + currentUser.access_token
      },
      body: JSON.stringify({ ...action.payload, NoOfBaseUnit: parseFloat(action.payload.NoOfBaseUnit) })
    }).then(async (response) => {
      if (response.status >= 205) {
        const result = await response.json();
        return { result, error: true };
      }
      return response.json();
    });
    if (uom.error) {
      yield put(addUomFailure(uom));
    } else {
      yield put(fetchUomStart())
      //yield put(addUomSuccess({ ...action.payload,Id:uom }));
    }
  } catch (error) {
    yield put(addUomFailure(error));
  }
}
export function* updateUomAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const uom = yield fetch(url + "/api/UOM/Update", {
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
    if (uom.error) {
      yield put(addUomFailure(uom));
    } else {
      yield put(fetchUomStart())
      //yield put(addUomSuccess({ ...action.payload,Id:uom }));
    }
  } catch (error) {
    yield put(addUomFailure(error));
  }
}
export function* changeUomAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const uom = yield fetch(url + "/api/UOM/UpdateMultipleUOMsWithChildrens", {
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
    if (uom.error) {
      yield put(updateUomFailure(uom));
    } else {
      yield put(updateUomSuccess({ uom }));
    }
  } catch (error) {
    yield put(updateUomFailure(error));
  }
}
export function* addUomStart() {
  yield takeEvery(uomTypes.ADD_UOM_START, addUomAsync)
}
export function* updateUomStart() {
  yield takeEvery(uomTypes.UPDATE_UOM_START, updateUomAsync)
}
export function* changeOrder() {
  yield takeEvery(uomTypes.UOM_ORDER_CHANGED, changeUomAsync)
}
export function* fetchUom() {
  yield takeLatest(uomTypes.FETCH_UOM_START, fetchUomAsync);
}
export function* fetchUomDetail() {
  yield takeLatest(uomTypes.FETCH_UOM_DETAIL, fetchUomDetailAsync);
}
export function* fetchPeriferalUom() {
  yield takeLatest(uomTypes.FETCH_PERIFERAL_UOMS_START, fetchPeriferalUomAsync);
}
export function* removeUom() {
  yield takeLatest(uomTypes.REMOVE_UOM_START, removeUomAsync);
}
export function* uomSagas() {
  yield all([
    call(addUomStart),
    call(updateUomStart),
    call(changeOrder),
    call(fetchUom),
    call(fetchPeriferalUom),
    call(fetchUomDetail),
    call(removeUom)
  ]);
}