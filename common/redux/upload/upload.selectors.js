import { createSelector } from 'reselect';

const uploads = state => state.upload;

export const selectUploader = createSelector(
  [uploads],
  upload => upload.progress
);
export const selectUploadedFiles = createSelector(
  [uploads],
  upload=>upload.files
);
