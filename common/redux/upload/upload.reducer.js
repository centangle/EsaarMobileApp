import { UploadActionTypes } from "./upload.types";

const INITIAL_STATE = {
  progress: 0,
  files: [],
};

const upload = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UploadActionTypes.UPLOAD_REQUEST:
      return {
        ...state,
      };
    case UploadActionTypes.UPLOAD_REMOVE:
      return {
        ...state,
        files: state.files.filter((el) => el.file !== action.payload),
      };
    case UploadActionTypes.UPLOAD_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case "ADD_DONATION_REQUEST_SUCCESS":
    case "OPEN_MODAL":
    case "ADD_DONATION_SUCCESS":
      return {
        ...state,
        files: [],
      };
    case UploadActionTypes.UPLOAD_SUCCESS:
      return {
        ...state,
        progress: 0,
        files: [...state.files, { file: action.meta }],
      };
    // case customerTypes.PUT_CUSTOMER_ID_IN_REDUX:
    //   return {
    //     files: action.payload.files ? action.payload.files : []
    //   }

    default:
      return state;
  }
};

export default upload;
