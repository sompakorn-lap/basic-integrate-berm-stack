import { google } from "googleapis";

const ggauth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GGAUTH_CREDENTIALS as string),
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.readonly",
  ],
});

export default ggauth;