// All API calls are handled in this file. This file is used to store the base URL of the API and the endpoints of the API. This file is used to make the API calls in the application.

// THIS URL FOR SEVER SIDE RENDERING
const APPLICATION_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// THIS URL FOR CLIENT SIDE RENDERING
const APPLICATION_PROXY_URL = process.env.NODE_ENV != 'production' ? `${process.env.NEXT_PUBLIC_AUTH_URL}/external-api` : `${APPLICATION_BASE_URL}`;

//Auth Module API Config
export const LOGIN_VIA_PASSWORD = `${APPLICATION_BASE_URL}/nilpapi/api/v1/user/login`;
export const LOGIN_VIA_OTP = `${APPLICATION_BASE_URL}/nilpapi/api/v1/user/login-otp`;

// User Management API Config
export const MANAGE_USER = `${APPLICATION_PROXY_URL}/nilpapi/api/v1/user/list`;