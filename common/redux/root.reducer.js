import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';

import setting from './setting/setting.reducers';
import user from './user/user.reducers';
import notification from './notification/notification.reducers';
import item from './item/item.reducers';
import organization from './organization/organization.reducers';
import request from './request/request.reducers';
import upload from './upload/upload.reducer';
import donation from './donation/donation.reducers';
import region from './region/region.reducers';
import uom from './uom/uom.reducers';
import event from './event/event.reducers';
import campaign from './campaign/campaign.reducers';
import { AsyncStorage } from "react-native";
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [user]//['cardsById','listsById','boardsById','currentUser','isGuest','currentBoardId','customersById']
};

const rootReducer = combineReducers({
  setting,
  user,
  notification,
  item,
  organization,
  request,
  upload,
  donation,
  region,
  uom,
  event,
  campaign
});
export default persistReducer(persistConfig, rootReducer);