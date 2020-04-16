import { call, put, take,takeEvery,all,select } from 'redux-saga/effects';
import { UploadActionTypes } from './upload.types';
//ActionTypes, uploadProgress, uploadSuccess, uploadFailure
import { createUploadFileChannel } from './upload.channels';

import {uploadFailure,uploadSuccess,uploadProgress} from './upload.actions';
import { selectCurrentUser } from "../user/user.selectors";
// Watch for an upload request and then
// defer to another saga to perform the actual upload
export function* uploadRequestWatcherSaga() {
    yield takeEvery(UploadActionTypes.UPLOAD_REQUEST, function*(action) {
        const {file,type,item} = action.payload;
        yield call(uploadFileSaga, {file,type,item});
    });
}
// Upload the specified file
export function* uploadFileSaga(input) {
    const {file,type,item} = input;
    const { links } = require("../api.links");
    const uploadUrl = links['UPLOAD'];
    const currentUser = yield select(selectCurrentUser);
    const channel = yield call(createUploadFileChannel, uploadUrl, file,currentUser.access_token);
    while (true) {
        const { progress = 0, err, success,response } = yield take(channel);
        if (err) {
            yield put(uploadFailure(file, err));
            return;
        }
        if (success) {
            yield put(uploadSuccess({response:JSON.parse(response),type,item}));
        }
        yield put(uploadProgress(file, progress));
    }
}
export function* downloadRequestAsync(action){
    const { links } = require("../api.links");
    const uploadUrl = links['UPLOAD']
    var FileSaver = require('file-saver');
    yield FileSaver.saveAs(uploadUrl+'?id='+action.payload.file, action.payload.name);
}
export function* downloadRequest(file){
    yield takeEvery(
    UploadActionTypes.UPLOAD_DOWNLOAD,
    downloadRequestAsync
  );
}
export function* uploadSagas() {
  yield all([
    call(uploadRequestWatcherSaga),
    call(downloadRequest)
  ])
}