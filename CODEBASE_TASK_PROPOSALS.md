# Codebase Issue Review: Proposed Tasks

## 1) Task: Fix typo in date formatter naming
- **Issue found:** The utility function is exported as `getFormatttedDate` (triple `t`) and imported with the same typo in the expense table.
- **Why this matters:** The typo hurts readability and makes API discovery harder for future contributors.
- **Proposed fix:** Rename the function to `getFormattedDate`, update all imports/usages, and run lint/build to ensure no stale references.
- **Acceptance criteria:**
  - `getFormatttedDate` no longer exists in the codebase.
  - `getFormattedDate` is used consistently at all call sites.

## 2) Task: Fix `/login` route guard bug
- **Issue found:** The `/login` route currently gates rendering based on `!isLoading` instead of authentication status (`isLoggedIn`).
- **Why this matters:** Loading state should not control auth navigation. This can show the login page to already authenticated users when data loading is false.
- **Proposed fix:** Change the route condition to use `isLoggedIn`, so authenticated users are redirected to `/` and unauthenticated users see the login page.
- **Acceptance criteria:**
  - When `isLoggedIn === true`, navigating to `/login` redirects to `/`.
  - When `isLoggedIn === false`, navigating to `/login` shows the login form.

## 3) Task: Fix documentation discrepancy in startup steps
- **Issue found:** README startup instructions only mention `npm run dev`, but the app reads expenses from `http://localhost:4000` and includes a separate `start-server` script for `json-server`.
- **Why this matters:** New developers following the README will run the UI without backend data and encounter API errors.
- **Proposed fix:** Update README installation/run steps to include launching the mock API server (e.g., separate terminal with `npm run start-server`) before or alongside `npm run dev`.
- **Acceptance criteria:**
  - README contains explicit instructions for both frontend and mock backend startup.
  - A first-time setup following README produces a working expense list flow.

## 4) Task: Improve automated test coverage for core utilities and routing behavior
- **Issue found:** The project currently has no test script/framework configured.
- **Why this matters:** Regressions in formatting helpers and route guards can ship unnoticed (for example, typo-driven rename errors or auth guard mistakes).
- **Proposed fix:** Add a lightweight test setup (Vitest + React Testing Library) and create tests for:
  - `getFormattedDate`, `getFormattedPrice`, and `getShortDescription` behavior.
  - `/login` route behavior for authenticated vs unauthenticated users.
- **Acceptance criteria:**
  - `npm test` (or equivalent) runs in CI/local.
  - Utility tests cover normal and boundary inputs.
  - Route test verifies redirect/login rendering conditions.
