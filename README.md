# Activity Points Management System

A front-end-only React application that helps a student track activity
points earned through co-curricular, extra-curricular, technical,
professional, social and other approved college activities.

This is a **front-end demonstration project** — there is no backend
server or database. All data is read from local JSON files, and any
new activity you add is kept in the browser's `localStorage` only (so
it survives a page refresh, but isn't shared with anyone else or saved
to a real database).

## Live Demo

- GitHub Pages: https://joelsebastianjijo.github.io/activity-points-management-system/
- Repository: https://github.com/JoelSebastianJijo/activity-points-management-system

## Sample Login

| UID          | Password |
|--------------|----------|
| RJC2024001   | pass123  |
| RJC2024002   | demo123  |
| RJC2024003   | demo123  |

## Tech Stack

- React 19 (functional components, hooks)
- React Router (HashRouter, for clean GitHub Pages routing)
- Vite (build tool)
- Plain CSS (no UI framework)
- JSON files as the data source

## Project Structure

```
src/
  components/     Reusable UI pieces (Navbar, StatusTag, ProtectedRoute)
  context/        AppContext — holds login state and activity data/actions
  data/           students.json, activities.json, categories.json
  pages/          Login, Dashboard, ActivityList, AddActivity, Profile
  utils.js        Shared helpers (points calculations, category lookup)
  App.jsx         Route definitions
  main.jsx        App entry point (wraps App in HashRouter)
  index.css       All styling
```

## Features

- **Login** — UID + password checked against `data/students.json`.
- **Dashboard** — student name, UID, department, semester, and a
  points summary (earned / target / remaining) with a progress ring.
- **Activity List** — every submitted activity with category, date,
  points claimed, points approved and status, filterable by category.
- **Add Activity** — a validated form (title, category, date,
  description, points claimed) that appends a new "Pending" activity.
- **Profile** — student details plus an overall points summary and a
  breakdown of activities by category.

### React concepts demonstrated

- Function components and JSX throughout
- Props passed between components (e.g. `StatusTag`)
- `useState` for form fields, filters and login state
- `useEffect` for restoring a saved session/activities on load
- React Context (`AppContext`) for global auth + activity state
- React Router for page navigation and a protected-route guard
- Conditional rendering (login errors, empty states, status colors,
  loading state)
- Controlled form handling with validation (Login and Add Activity)

## Running the Project Locally

1. Clone the repository:
   ```
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open the printed local URL (usually `http://localhost:5173`) in
   your browser.

## Deploying to GitHub Pages

1. Push this project to a public GitHub repository.
2. Run:
   ```
   npm run deploy
   ```
   This builds the app and publishes the `dist/` folder to a `gh-pages`
   branch using the `gh-pages` npm package.
3. In your repository's **Settings → Pages**, set the source to the
   `gh-pages` branch (this only needs to be done once).
4. Your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

> `vite.config.js` uses `base: './'` (relative paths), so the build
> works correctly under any repository name without further changes.