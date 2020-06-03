import { organizationTypes } from "./organization.types";
export const redirect = (redirectUrl) => {
  window.location = redirectUrl;
};
export const putInitialData = (collections) => ({
  type: organizationTypes.PUT_INITIAL_DATA,
  payload: collections,
});
export const addOrganizationSuccess = (organization) => ({
  type: organizationTypes.ADD_ORGANIZATION_SUCCESS,
  payload: organization,
});
export const updateOrganizationSuccess = (organization) => ({
  type: organizationTypes.UPDATE_ORGANIZATION_SUCCESS,
  payload: organization,
});
export const updateOrganizationFailure = (error) => ({
  type: organizationTypes.UPDATE_ORGANIZATION_FAILURE,
  payload: error,
});
export const fetchOrganizationDetail = (Id) => ({
  type: organizationTypes.FETCH_ORG_DETAIL,
  payload: Id,
});
export const addCampaignSuccess = (campaign) => ({
  type: organizationTypes.ADD_ORG_CAMPAIGN_SUCCESS,
  payload: campaign,
});
export const addAttachmentSuccess = (collection) => ({
  type: organizationTypes.ADD_ORG_ATTACHMENT_SUCCESS,
  payload: collection,
});
export const fetchOrgAttachmentsSuccess = (collection) => ({
  type: organizationTypes.FETCH_ORG_ATTACHMENTS_SUCCESS,
  payload: collection,
});
export const addCampaignFailure = (error) => ({
  type: organizationTypes.ADD_ORG_CAMPAIGN_FAILURE,
  payload: error,
});
export const addAttachmentFailure = (error) => ({
  type: organizationTypes.ADD_ORG_ATTACHMENT_FAILURE,
  payload: error,
});
export const fetchOrgCategoriesSuccess = (collection) => ({
  type: organizationTypes.FETCH_ORG_CATEGORIES_SUCCESS,
  payload: collection,
});
export const fetchOrgOfficesSuccess = (collection) => ({
  type: organizationTypes.FETCH_ORG_OFFICES_SUCCESS,
  payload: collection,
});
export const fetchOrgAccountsSuccess = (collection) => ({
  type: organizationTypes.FETCH_ORG_ACCOUNTS_SUCCESS,
  payload: collection,
});
export const addPackageSuccess = (campaign) => ({
  type: organizationTypes.ADD_ORG_PACKAGE_SUCCESS,
  payload: campaign,
});
export const addPackageFailure = (error) => ({
  type: organizationTypes.ADD_ORG_PACKAGE_FAILURE,
  payload: error,
});
export const addOfficeSuccess = (campaign) => ({
  type: organizationTypes.ADD_ORG_OFFICE_SUCCESS,
  payload: campaign,
});
export const addOfficeFailure = (error) => ({
  type: organizationTypes.ADD_ORG_OFFICE_FAILURE,
  payload: error,
});
export const addAccountSuccess = (campaign) => ({
  type: organizationTypes.ADD_ORG_ACCOUNT_SUCCESS,
  payload: campaign,
});
export const addAccountFailure = (error) => ({
  type: organizationTypes.ADD_ORG_ACCOUNT_FAILURE,
  payload: error,
});
export const addOrgRegionSuccess = (region) => ({
  type: organizationTypes.ADD_ORG_REGION_SUCCESS,
  payload: region,
});
export const addOrgRegionFailure = (error) => ({
  type: organizationTypes.ADD_ORG_REGION_FAILURE,
  payload: error,
});
export const fetchOrganizationSuccess = (collections) => ({
  type: organizationTypes.FETCH_ORGANIZATION_SUCCESS,
  payload: collections,
});
export const fetchOrgRegionsSuccess = (collections) => ({
  type: organizationTypes.FETCH_ORG_REGIONS_SUCCESS,
  payload: collections,
});
export const fetchOrgRegionsStart = ({ payload, params }) => ({
  type: organizationTypes.FETCH_ORG_REGIONS_START,
  payload,
  params,
});
export const fetchOrgRequestsStart = ({ type, id, userType, params }) => ({
  type,
  payload: id,
  userType,
  params,
});
export const fetchOrgCampaignsStart = (id) => ({
  type: organizationTypes.FETCH_ORG_CAMPAIGN_START,
  payload: id,
});
export const fetchOrgRequestsSuccess = (collections) => ({
  type: organizationTypes.FETCH_ORG_REQUESTS_SUCCESS,
  payload: collections,
});
export const fetchOrgPackagesSuccess = (collections) => ({
  type: organizationTypes.FETCH_ORG_PACKAGES_SUCCESS,
  payload: collections,
});
export const fetchOrgCampaignsSuccess = (collections) => ({
  type: organizationTypes.FETCH_ORG_CAMPAIGNS_SUCCESS,
  payload: collections,
});
export const fetchOrgMembersSuccess = (collections) => ({
  type: organizationTypes.FETCH_ORG_MEMBERS_SUCCESS,
  payload: collections,
});
export const fetchOrgItemsStart = (Id) => ({
  type: organizationTypes.FETCH_ORG_ITEMS_START,
  payload: Id,
});
export const fetchOrgItemsSuccess = (collections) => ({
  type: organizationTypes.FETCH_ORG_ITEMS_SUCCESS,
  payload: collections,
});
export const addOrganizationFailure = (error) => ({
  type: organizationTypes.ADD_ORGANIZATION_FAILURE,
  payload: error,
});
export const fetchOrganizationStart = (params) => ({
  type: organizationTypes.FETCH_ORGANIZATION_START,
  params,
});
export const fetchOrgDetailStart = (Id) => ({
  type: organizationTypes.FETCH_ORG_DETAIL,
  payload: Id,
});
export const fetchOrgDetailSuccess = (collection) => ({
  type: organizationTypes.FETCH_ORG_DETAIL_SUCCESS,
  payload: collection,
});
export const requestSuccess = (collections) => ({
  type: organizationTypes.REQUEST_SUCCESS,
  payload: collections,
});
export const requestFailure = (error) => ({
  type: organizationTypes.REQUEST_FAILURE,
  payload: error,
});
export const fetchOrgOfficesFailure = (error) => ({
  type: organizationTypes.FETCH_ORG_OFFICES_FAILURE,
  payload: error,
});
export const fetchOrgAccountsFailure = (error) => ({
  type: organizationTypes.FETCH_ORG_ACCOUNTS_FAILURE,
  payload: error,
});
export const fechOrganizationPage = (Id) => ({
  type: organizationTypes.SELECT_ORGANIZATION,
  payload: Id,
});
//
export const addOrgItemSuccess = (item) => ({
  type: organizationTypes.ADD_ORG_ITEMS_SUCCESS,
  payload: item,
});
export const removeOrgItemSuccess = (item) => ({
  type: organizationTypes.REMOVE_ORG_ITEMS_SUCCESS,
  payload: item,
});
export const addOrgItemFailure = (item) => ({
  type: organizationTypes.REMOVE_ORG_ITEMS_FAILURE,
  payload: item,
});
export const fetchOrgMembersDDSuccess = (payload) => ({
  type: organizationTypes.MEMBERS_FOR_DD,
  payload,
});
export const removeOrgItemFailure = (item) => ({
  type: organizationTypes.REMOVE_ORG_ITEMS_FAILURE,
  payload: item,
});
export const fetchOrgPackagesStart = ({ params, payload }) => ({
  type: organizationTypes.FETCH_ORG_PACKAGES_START,
  params,
  payload,
});
export const fetchOrgOfficesStart = ({ params, payload }) => ({
  type: organizationTypes.FETCH_ORG_OFFICES_START,
  params,
  payload,
});
export const fetchOrgAccountsStart = ({ params, payload }) => ({
  type: organizationTypes.FETCH_ORG_ACCOUNTS_START,
  params,
  payload,
});
export const fetchAttachmentsStart = ({ params, payload }) => ({
  type: organizationTypes.FETCH_ORG_ATTACHMENTS_START,
  params,
  payload,
});
