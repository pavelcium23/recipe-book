# Recipe Book

A client-side recipe management app built with React and Vite. Browse, add, like, filter, and search your personal cooking collection — all stored in your browser.

## App Description

Recipe Book is a personal cookbook you run entirely in the browser. No backend, no accounts — your recipes live in localStorage and are always available when you come back.

## Entities

**Recipe**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (crypto.randomUUID) |
| `title` | string | Recipe name |
| `category` | string | One of: Breakfast, Lunch, Dinner, Dessert, Snack |
| `ingredients` | string[] | List of ingredients |
| `steps` | string[] | Ordered cooking steps |
| `liked` | boolean | Whether the user has favourited this recipe |
| `createdAt` | number | Timestamp (Date.now()) |

## User Flows

### Browse
Open the app → see all recipes displayed as cards in a responsive grid.

### Add a Recipe
Click **+ Add Recipe** → fill in title, category, ingredients and steps in the modal → click **Save** → card appears in the grid.

### Delete a Recipe
Click the trash icon on any card → recipe is removed from the list and from localStorage.

### Like / Favourite
Click the heart icon on a card → icon toggles filled/empty; liked state persists across page reloads.

### Filter by Category
Click a category tab (All / Breakfast / Lunch / Dinner / Dessert / Snack) → grid updates to show only matching recipes.

### Search
Type in the search bar → cards are filtered in real time by title or ingredient match.

### Dark Mode
Click the sun/moon toggle in the header → theme switches between light and dark; preference is saved in localStorage.

## Tech Stack

- **Framework**: React 19
- **Bundler**: Vite
- **State**: React `useState` / `useReducer` (runtime) + `localStorage` (persistence)
- **Hosting**: GitHub Pages

## Running Locally

```bash
npm install
npm run dev
```
