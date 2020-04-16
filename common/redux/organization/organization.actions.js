import {organizationTypes} from './organization.types';
export const putInitialData = collections =>({
  type:organizationTypes.PUT_INITIAL_DATA,
  payload:collections
});
export const addOrganizationSuccess = organization => ({
  type: organizationTypes.ADD_ORGANIZATION_SUCCESS,
  payload: organization
});
export const fetchOrganizationSuccess = collections =>({
  type:organizationTypes.FETCH_ORGANIZATION_SUCCESS,
  payload:collections
});
export const fetchOrgRequestsSuccess = collections =>({
  type:organizationTypes.FETCH_ORG_REQUESTS_SUCCESS,
  payload:collections
});
export const fetchOrgMembersSuccess = collections =>({
  type:organizationTypes.FETCH_ORG_MEMBERS_SUCCESS,
  payload:collections
});
export const fetchOrgItemsStart = (Id)=>({
   type: organizationTypes.FETCH_ORG_ITEMS_START,
    payload:Id
})
export const fetchOrgItemsSuccess = collections =>({
  type:organizationTypes.FETCH_ORG_ITEMS_SUCCESS,
  payload:collections
});
export const addOrganizationFailure = error => ({
  type: organizationTypes.ADD_ORGANIZATION_FAILURE,
  payload: error
});
export const fetchOrganizationStart = () => ({
  type: organizationTypes.FETCH_ORGANIZATION_START
});
export const fetchOrgDetailStart = (Id) => ({
  type: organizationTypes.FETCH_ORG_DETAIL,
  payload:Id
});
export const fetchOrgDetailSuccess = collection =>({
type:organizationTypes.FETCH_ORG_DETAIL_SUCCESS,
  payload:collection
})
export const requestSuccess = collections =>({
  type: organizationTypes.REQUEST_SUCCESS,
  payload:collections
});
export const requestFailure = error => ({
  type: organizationTypes.REQUEST_FAILURE,
  payload: error
});
export const fechOrganizationPage = (Id)=>({
  type:organizationTypes.SELECT_ORGANIZATION,
  payload:Id
});
//
export const addOrgItemSuccess = (item)=>({
  type:organizationTypes.ADD_ORG_ITEMS_SUCCESS,
  payload:item
});
export const removeOrgItemSuccess = (item)=>({
  type:organizationTypes.REMOVE_ORG_ITEMS_SUCCESS,
  payload:item
});
export const addOrgItemFailure = (item)=>({
  type:organizationTypes.ADD_ORGANIZATION_FAILURE,
  payload:item
});
export const removeOrgItemFailure = (item)=>({
  type:organizationTypes.REMOVE_ORG_ITEMS_FAILURE,
  payload:item
});