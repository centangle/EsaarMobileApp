import { takeLatest, all, call, put, select } from "redux-saga/effects";
import { donationTypes } from "./donation.types";
import { selectCurrentUser } from "../user/user.selectors";
import {
  addDonationSuccess,
  addDonationFailure,
  addDonationApprovalSuccess,
  addDonationApprovalFailure,
  fetchDonationRequestSuccess,
  fetchDonationRequestThreadSuccess,
  fetchDonationDetailsSuccess,
  fetchRequestStatusSuccess,
  fetchDonationItemsSuccess,
  fetchThreadDetailSuccess,
  assignRequestSuccess,
  assignRequestFailure,
} from "./donation.actions";
import { apiLink } from "../api.links";
const url = apiLink;
export function* addDonationAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const donation = yield fetch(url + "/api/DonationRequest/Create", {
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
        return { ...result, error: true };
      } else {
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
export function* addApprovalAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    const donation = yield fetch(url + "/api/DonationRequest/UpdateStatus", {
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
        return { ...result, error: true };
      } else {
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
export function* fetchRequestAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  let q =
    "recordsPerPage=" +
    action.params.itemsCountPerPage +
    "&currentPage=" +
    action.params.activePage +
    "&orderDir=Desc" +
    "&calculateTotal=true" +
    "&disablePagination=false";
  if (action.params && action.params.filters) {
    action.params.filters.forEach((filter) => {
      if (filter.searchType) {
        let count = 0;
        filter.searchType.forEach((f) => {
          q += "&types[" + count + "]=" + f.Name;
          count++;
        });
      }
      if (filter.status) {
        let count = 0;
        filter.status.forEach((f) => {
          q += "&statuses[" + count + "]=" + f.Name;
          count++;
        });
      }
      if (filter.timePeriod) {
        filter.timePeriod.forEach((f) => {
          if (f.startDate || f.endDate) {
            q += "&startDate=" + f.startDate;
            q += "&endDate=" + f.endDate;
          } else {
            q += "&timePeriod=" + f.Name;
          }
        });
      }
    });
  }
  //const q = "recordsPerPage=0&currentPage=1&orderDir=Asc&disablePagination=true";
  try {
    const response = yield fetch(
      url + "/api/DonationRequest/GetPaginated?" + q,
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
      yield put(fetchDonationRequestSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchThreadAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  const q =
    "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Donation&entityId=" +
    action.payload;
  try {
    const response = yield fetch(url + "/api/RequestThread/GetPaginated?" + q, {
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
      return { ok: true, result: result.Items, Id: action.payload };
    });
    if (response.ok) {
      yield put(fetchDonationRequestThreadSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchRequestStatusAsync() {
  const currentUser = yield select(selectCurrentUser);
  try {
    const response = yield fetch(
      url + "/api/DonationRequest/GetRequestStatus",
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
      return { ok: true, result: result };
    });
    if (response.ok) {
      yield put(fetchRequestStatusSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* assignRequestAsync(action) {
  try {
    const currentUser = yield select(selectCurrentUser);
    //let q = "organizationId=" + action.payload.organizationId + "&donationRequestId=" + action.payload.requestId;
    if (action.payload.requestType === "AssignModeratorToRequest") {
      //q+="&moderatorId="+currentUser.Id;
    }
    if (action.payload.requestType === "AssignVolunteerToRequest") {
      //q+="&moderatorId="+currentUser.Id;
    }
    const request = yield fetch(url + "/api/DonationRequest/UpdateStatus", {
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
    if (request.error) {
      yield put(assignRequestFailure(request));
    } else {
      yield put({
        type: "FETCH_DONATION_REQUEST_THREAD_START",
        payload: action.payload.donationRequestOrganizationId,
      });
      yield put({
        type: "FETCH_DONATION_DETAILS_START",
        payload: action.payload.donationRequestOrganizationId,
      });
      yield put(assignRequestSuccess({ request, result: action.payload }));
    }
  } catch (error) {
    yield put(assignRequestFailure(error));
  }
}
export function* fetchDonationDetailsAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  try {
    const response = yield fetch(
      url + "/api/DonationRequest/Get?donationRequestId=" + action.payload,
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
      return { ok: true, result: result };
    });
    if (response.ok) {
      yield put(fetchDonationDetailsSuccess(response.result));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchDonationItemsAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  //const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Organization&entityId=" + action.payload;
  try {
    const response = yield fetch(
      url + "/api/DonationRequest/GetItems?donationRequestId=" + action.payload,
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
      return { ok: true, result: result };
    });
    if (response.ok) {
      yield put(fetchDonationItemsSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* fetchThreadDetailAsync(action) {
  const currentUser = yield select(selectCurrentUser);
  //const q = "recordsPerPage=0&type=General&currentPage=1&orderDir=Desc&disablePagination=true&entityType=Organization&entityId=" + action.payload;
  try {
    const response = yield fetch(
      url + "/api/RequestThread/Get/" + action.payload.id,
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
      return { ok: true, result: result };
    });
    if (response.ok) {
      yield put(fetchThreadDetailSuccess(response));
    }
  } catch (error) {
    alert(error);
  }
}
export function* addDonation() {
  yield takeLatest(donationTypes.ADD_DONATION_START, addDonationAsync);
}
export function* fetchRequest() {
  yield takeLatest(
    donationTypes.FETCH_DONATION_REQUEST_START,
    fetchRequestAsync
  );
}
export function* fetchThread() {
  yield takeLatest(
    donationTypes.FETCH_DONATION_REQUEST_THREAD_START,
    fetchThreadAsync
  );
}
export function* fetchRequestStatus() {
  yield takeLatest(
    donationTypes.FETCH_DONATION_REQUEST_STATUS_START,
    fetchRequestStatusAsync
  );
}
export function* fetchDonationItems() {
  yield takeLatest(
    donationTypes.FETCH_DONATION_ITEMS_START,
    fetchDonationItemsAsync
  );
}
export function* fetchDonationDetails() {
  yield takeLatest(
    donationTypes.FETCH_DONATION_DETAILS_START,
    fetchDonationDetailsAsync
  );
}
export function* addApproval() {
  yield takeLatest(donationTypes.ADD_DONATION_APPROVAL_START, addApprovalAsync);
}
export function* fetchThreadDetail() {
  yield takeLatest(
    donationTypes.FETCH_THREAD_DETAIL_START,
    fetchThreadDetailAsync
  );
}
export function* assignRequest() {
  yield takeLatest(
    donationTypes.ADD_DONATION_REQUEST_START,
    assignRequestAsync
  );
}
export function* donationSagas() {
  yield all([
    call(addDonation),
    call(addApproval),
    call(fetchRequest),
    call(fetchThread),
    call(fetchRequestStatus),
    call(fetchDonationItems),
    call(fetchDonationDetails),
    call(fetchThreadDetail),
    call(assignRequest),
  ]);
}
