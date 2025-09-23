// src/config/featureFlags.js
export const USER_LOGIN_FEATURE =
  import.meta.env.VITE_USER_LOGIN_FEATURE === "true";
export const NEW_DASHBOARD_FEATURE =
  import.meta.env.VITE_NEW_DASHBOARD_FEATURE === "true";
