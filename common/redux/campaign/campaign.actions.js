import {campaignTypes} from './campaign.types';
export const putInitialData = collections =>({
  type:campaignTypes.PUT_INITIAL_DATA,
  payload:collections
});
export const addCampaignSuccess = campaign => ({
  type: campaignTypes.ADD_CAMPAIGN_SUCCESS,
  payload: campaign
});
export const updateCampaignSuccess = campaign => ({
  type: campaignTypes.UPDATE_CAMPAIGN_SUCCESS,
  payload: campaign
});
export const updateCampaignFailure = error => ({
  type: campaignTypes.UPDATE_CAMPAIGN_FAILURE,
  payload: error
});
export const fetchCampaignRegionsStart = ({id,params}) =>({
  type:campaignTypes.FETCH_CAMPAIGN_REGIONS_START,
  payload:{id},
  params
})

export const addAttachmentSuccess = collection => ({
  type: campaignTypes.ADD_CAMPAIGN_ATTACHMENT_SUCCESS,
  payload: collection
});
export const fetchCampaignAttachmentsSuccess = collection =>({
  type: campaignTypes.FETCH_CAMPAIGN_ATTACHMENTS_SUCCESS,
  payload: collection
});

export const addAttachmentFailure = error => ({
  type: campaignTypes.ADD_CAMPAIGN_ATTACHMENT_FAILURE,
  payload: error
});
export const fetchCampaignCategoriesSuccess = collection =>({
  type: campaignTypes.FETCH_CAMPAIGN_CATEGORIES_SUCCESS,
  payload: collection
});
export const fetchCampaignOfficesSuccess = collection =>({
  type: campaignTypes.FETCH_CAMPAIGN_OFFICES_SUCCESS,
  payload: collection
});
export const fetchCampaignAccountsSuccess = collection =>({
  type: campaignTypes.FETCH_CAMPAIGN_ACCOUNTS_SUCCESS,
  payload: collection
});
export const addPackageSuccess = campaign => ({
  type: campaignTypes.ADD_CAMPAIGN_PACKAGE_SUCCESS,
  payload: campaign
});
export const addPackageFailure = error => ({
  type: campaignTypes.ADD_CAMPAIGN_PACKAGE_FAILURE,
  payload: error
});
export const addOfficeSuccess = campaign => ({
  type: campaignTypes.ADD_CAMPAIGN_OFFICE_SUCCESS,
  payload: campaign
});
export const addOfficeFailure = error => ({
  type: campaignTypes.ADD_CAMPAIGN_OFFICE_FAILURE,
  payload: error
});
export const addAccountSuccess = campaign => ({
  type: campaignTypes.ADD_CAMPAIGN_ACCOUNT_SUCCESS,
  payload: campaign
});
export const addAccountFailure = error => ({
  type: campaignTypes.ADD_CAMPAIGN_ACCOUNT_FAILURE,
  payload: error
});
export const addCampaignRegionSuccess = region => ({
  type: campaignTypes.ADD_CAMPAIGN_REGION_SUCCESS,
  payload: region
});
export const addCampaignRegionFailure = error => ({
  type: campaignTypes.ADD_CAMPAIGN_REGION_FAILURE,
  payload: error
});
export const fetchCampaignSuccess = collections =>({
  type:campaignTypes.FETCH_CAMPAIGN_SUCCESS,
  payload:collections
});
export const fetchCampaignRegionsSuccess = collections =>({
  type:campaignTypes.FETCH_CAMPAIGN_REGIONS_SUCCESS,
  payload:collections
});
export const fetchCampaignRequestsStart = ({type,payload,userType,params}) =>({
  type,
  payload,
  userType,
  params
});
export const fetchCampaignCampaignsStart = (id)=>({
  type:campaignTypes.FETCH_CAMPAIGN_CAMPAIGN_START,
  payload:id
})
export const fetchCampaignRequestsSuccess = collections =>({
  type:campaignTypes.FETCH_CAMPAIGN_REQUESTS_SUCCESS,
  payload:collections
});
export const fetchCampaignPackagesSuccess = collections=>({
  type:campaignTypes.FETCH_CAMPAIGN_PACKAGES_SUCCESS,
  payload:collections
});
export const fetchCampaignCampaignsSuccess = collections=>({
  type:campaignTypes.FETCH_CAMPAIGN_CAMPAIGNS_SUCCESS,
  payload:collections
});
export const fetchCampaignMembersSuccess = collections =>({
  type:campaignTypes.FETCH_CAMPAIGN_MEMBERS_SUCCESS,
  payload:collections
});
export const fetchCampaignItemsStart = (Id)=>({
   type: campaignTypes.FETCH_CAMPAIGN_ITEMS_START,
    payload:Id
})
export const fetchCampaignItemsSuccess = collections =>({
  type:campaignTypes.FETCH_CAMPAIGN_ITEMS_SUCCESS,
  payload:collections
});
export const addCampaignFailure = error => ({
  type: campaignTypes.ADD_CAMPAIGN_FAILURE,
  payload: error
});
export const fetchCampaignStart = (params) => ({
  type: campaignTypes.FETCH_CAMPAIGN_START,
  params
});
export const fetchCampaignDetailStart = (Id) => ({
  type: campaignTypes.FETCH_CAMPAIGN_DETAIL,
  payload:Id
});
export const fetchCampaignDetailSuccess = collection =>({
type:campaignTypes.FETCH_CAMPAIGN_DETAIL_SUCCESS,
  payload:collection
})
export const requestSuccess = collections =>({
  type: campaignTypes.REQUEST_SUCCESS,
  payload:collections
});
export const requestFailure = error => ({
  type: campaignTypes.REQUEST_FAILURE,
  payload: error
});
export const fetchCampaignOfficesFailure = error => ({
  type: campaignTypes.FETCH_CAMPAIGN_OFFICES_FAILURE,
  payload: error
});
export const fetchCampaignAccountsFailure = error => ({
  type: campaignTypes.FETCH_CAMPAIGN_ACCOUNTS_FAILURE,
  payload: error
});
export const fechCampaignPage = (Id)=>({
  type:campaignTypes.SELECT_CAMPAIGN,
  payload:Id
});
//
export const addCampaignItemSuccess = (item)=>({
  type:campaignTypes.ADD_CAMPAIGN_ITEMS_SUCCESS,
  payload:item
});
export const removeCampaignItemSuccess = (item)=>({
  type:campaignTypes.REMOVE_CAMPAIGN_ITEMS_SUCCESS,
  payload:item
});
export const addCampaignItemFailure = (item)=>({
  type:campaignTypes.REMOVE_CAMPAIGN_ITEMS_FAILURE,
  payload:item
});
export const removeCampaignItemFailure = (item)=>({
  type:campaignTypes.REMOVE_CAMPAIGN_ITEMS_FAILURE,
  payload:item
});
export const fetchCampaignPackagesStart = ({params,payload})=>({
  type:campaignTypes.FETCH_CAMPAIGN_PACKAGES_START,
  params,
  payload
});
export const fetchCampaignOfficesStart = ({params,payload})=>({
  type:campaignTypes.FETCH_CAMPAIGN_OFFICES_START,
  params,
  payload
});
export const fetchCampaignCategoriesFailure = error =>({
  type:campaignTypes.FETCH_CAMPAIGN_CATEGORIES_FAILURE,
  payload:error
});
export const fetchCampaignAccountsStart = ({params,payload})=>({
  type:campaignTypes.FETCH_CAMPAIGN_ACCOUNTS_START,
  params,
  payload
});
export const fetchAttachmentsStart = ({params,payload})=>({
  type:campaignTypes.FETCH_CAMPAIGN_ATTACHMENTS_START,
  params,
  payload
});