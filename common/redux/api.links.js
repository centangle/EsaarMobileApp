//require('dotenv').config();
let baseurl = "https://api.esaar.app";
// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//     // dev code
//     baseurl = 'https://api.esaar.app';
// }
export const links = {
  UPLOAD: baseurl + "/api/Attachment/Upload",
};
export const socketLink =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "charity.hostober.pk";

export const apiLink = baseurl;
