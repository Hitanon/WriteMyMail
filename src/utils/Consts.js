// Routes
export const MAIN_ROUTE = "/";
export const HOME_ROUTE = "/home";
export const IMPROVE_LETTER_ROUTE = "/improve_letter";
export const GENERATE_LETTER_ROUTE = "/generate_letter";
export const ACCOUNT_ROUTE = "/account";
export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";
export const ADD_EMAIL_ROUTE = "/add_email";
export const ADD_INFO_ROUTE = "/add_info";


//API
// Auth Endpoints
export const API_AUTH_LOGIN = "/api/v1/auth";
export const API_AUTH_REGISTER = "/api/v1/auth/register";
export const API_AUTH_REFRESH = "/api/v1/auth/refresh";

// User Endpoints
export const API_USER_UPDATE = "/api/v1/user/update";
export const API_USER_INFO = "/api/v1/user/{userId}";
export const API_USER_EMAILS = "/api/v1/user/{userId}/emails";

// Email Endpoints
export const API_EMAIL_CREATE = "/api/v1/email/create";
export const API_EMAIL_UPDATE = "/api/v1/email/update";
export const API_EMAIL_DELETE = "/api/v1/email/delete";

// Mail Endpoints
export const API_MAIL_SEND = "/api/v1/mail/send";

// AI Endpoints
export const API_AI_UPGRADE = "/api/v1/ai/upgrade";
export const API_AI_GENERATE = "/api/v1/ai/generate";


//UI
export const OUR_EMAIL = "info@writemymail.com";
export const EMAIL_COUNT_LIMIT = 3;
