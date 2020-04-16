import {notificationTypes} from './notification.types';

const INITIAL_STATE = {
};

const notification = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case notificationTypes.ADD_NOTIFICATION_START:
        return {
          ...state
        }
      default:
      return state;
  }
}
export default notification;