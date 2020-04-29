import { UploadActionTypes } from './upload.types';
export const uploadRequest = (file) => ({
    type: UploadActionTypes.UPLOAD_REQUEST,
    payload: file,
});
export const removeRequest = ({file,uploadType,item}) => ({
    type: UploadActionTypes.UPLOAD_REMOVE,
    payload: file,
    uploadType,
    item
});
export const downloadRequest = (file) => ({
    type: UploadActionTypes.UPLOAD_DOWNLOAD,
    payload: file
})
export const uploadProgress = (file, progress) => ({
    type: UploadActionTypes.UPLOAD_PROGRESS,
    payload: progress,
    meta: { file },
});
export const uploadSuccess = (files) => {
    return ({
        type: UploadActionTypes.UPLOAD_SUCCESS,
        meta: files.response,
        uploadType: files.type,
        item: files.item
    });
};
export const uploadFailure = (file, err) => ({
    type: UploadActionTypes.UPLOAD_FAILURE,
    payload: err,
    error: true,
    meta: { file },
});