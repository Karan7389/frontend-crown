# Frontend Fixes

## Bug Fixes
1. **api.js** — Removed hardcoded backend URL detection via hostname. Now uses `REACT_APP_API_URL` env var.

2. **App.jsx** — `/dashboard/subscribers` route was using an absolute path (`/dashboard/subscribers`) inside a nested `<Route>`. Changed to relative path `subscribers` so React Router nests it correctly.

3. **AuthContext.jsx** — Fixed inconsistent casing (`Authcontext` vs `AuthContext`). Added safe `try/catch` around `JSON.parse` for localStorage.

4. **Subscribers.jsx** — Was using raw `fetch()` without auth token (all admin routes require JWT). Replaced with `API` axios instance. CSV download now sends auth header.

5. **TreatmentForm.jsx** — Gallery multi-upload was POSTing to `/uploads/image` (single) with field name `file`. Fixed to use `/uploads/images` endpoint with field name `files`. Added proper error handling and slug field.

6. **AppointmentModal.jsx** — No error handling on submit (silent failure). Added error display, close button, form reset on open, and min-date to prevent past date selection.

7. **Dashboard.jsx** — `onMouseEnter/Leave` used `e.target` instead of `e.currentTarget`. When hovering the `<span>` label inside a button, the wrong element got the style. Fixed to `e.currentTarget`.

## Environment Variables
Set in your hosting dashboard (Railway/Netlify/Vercel etc.):
```
REACT_APP_API_URL=https://your-backend-url.up.railway.app
```
