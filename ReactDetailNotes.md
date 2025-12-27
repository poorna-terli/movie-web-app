**React Detail Notes**

- **Project Root:** `c:\Users\poorn\OneDrive\Documents\Desktop\react\first_react_project`
- **Main files discussed:** `src/App.jsx`, `src/components/search.jsx`

**Overview**
- **Purpose:** This note explains how the main pieces of the small React app connect: how `App.jsx` holds state, how `Search.jsx` receives and updates that state, why elements are placed in their specific order, and how you'd connect to an external API for movie data.

**Project structure (relevant files)**
- **`src/App.jsx`**: Top-level component (page shell). Holds the search state and passes it down as props to the `Search` component. Renders the header and where search results or state are shown.
- **`src/components/search.jsx`**: Controlled input component. Receives `searchTerm` and `setSearchTerm` from `App` and updates the value via `onChange`.

**How components connect (state & props flow)**
- **Single source of truth:** `App.jsx` uses `useState` to create `searchTerm` and `setSearchTerm`. This state lives in `App` and is the single authoritative value for the current search text.
- **Passing as props:** `App` passes `searchTerm` and `setSearchTerm` into `<Search />` via props: `<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />`.
- **Controlled component:** `Search` receives those props and binds the `<input>` `value` to `searchTerm`. When the user types, `onChange` calls `setSearchTerm(e.target.value)`, which updates `App`'s state and triggers a re-render. Because `value` is driven by `searchTerm`, the input shows the latest state.

**Why this pattern?**
- Lifting state up (state in `App`) lets multiple components read or act on the same data (e.g., a list component can consume `searchTerm` and filter results).
- Keeping the input controlled (value + onChange) prevents mismatch between the DOM and React state and makes it easy to add side effects (debounce, validation).

**Layout and order decisions**
- The page uses semantic grouping: header first (logo/banner + title), then search controls and results. This order follows normal reading flow: introduce the page (header), provide interaction (search), then show output (results/state).
- The `div.pattern` and `div.wrapper` are likely layout / decorative containers. Placement of wrappers depends on design — they are not functional for state but affect styles and composition.
- Avoid placing interactive controls inside inaccessible or visually confusing containers (keeps a11y and UX straightforward).

**Line-by-line explanation of `src/App.jsx`**

Here is the (cleaned) content we're explaining:

```jsx
import React, { useState } from "react"
import Search from "./components/search"

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>Find <span className="text-gradient">Movies</span> you'll enjoy without the hassle</h1>
        </header>
      </div>

      <div>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1>{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App
```

- `import React, { useState } from "react"`:
  - Imports React library and the `useState` hook to create local component state. Even though newer React versions don't require importing `React` for JSX, including it is fine and compatible.

- `import Search from "./components/search"`:
  - Imports the `Search` component so it can be used inside `App`.

- `const App = () => { ... }`:
  - Declares a functional component named `App`.

- `const [searchTerm, setSearchTerm] = useState("");`:
  - Creates state variable `searchTerm` initialized to an empty string and setter `setSearchTerm`. This stores what the user types into the search box.

- `return ( <main> ... </main> )`:
  - JSX returned by the component. `main` is used semantically as the page's main content.

- Layout blocks:
  - `<div className="pattern" />` — decorative or background pattern.
  - `<div className="wrapper">` — a container that groups the page header and applies layout styles.
  - `<header>` — contains `img` and `h1` (title). It introduces the page.

- `<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />`:
  - Renders the `Search` component and passes the current `searchTerm` and the setter. This creates a controlled input relationship.

- `<h1>{searchTerm}</h1>`:
  - Simple debug/display showing the current `searchTerm` value. In a real app this might be either removed or replaced with rendered search results filtered by `searchTerm`.

- `export default App`:
  - Exports the `App` component as the default export so it can be imported by `main.jsx` (your app entry).

**Line-by-line explanation of `src/components/search.jsx` (current implementation)**

```jsx
import { useState } from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search movies..."
        className="search-input"
      />
    </div>
  )
}

export default Search
```

- `const Search = ({ searchTerm, setSearchTerm }) => { ... }`:
  - The component extracts `searchTerm` and `setSearchTerm` from props.

- `<input value={searchTerm} onChange={...} />`:
  - Controlled input: `value` is set to `searchTerm`. When the user types, `onChange` calls `setSearchTerm(e.target.value)`, updating the state in `App`.

**Where to put API calls and why**
- If you need to fetch movie data from an external API, common options:
  - Fetch in `App.jsx` (or a parent container): keep data fetching central and pass results to children. Good if multiple components use the same data.
  - Fetch inside a results-list component: encapsulates fetching logic with the UI that renders it.

- Typical approach with `useEffect` in `App`:
  - `useEffect(() => { fetch(...).then(setResults) }, [searchTerm])` — runs when `searchTerm` changes (add debounce to avoid too many requests).
  - Store results as `const [results, setResults] = useState([])` in `App` and pass them down.

- API keys and environment variables:
  - Put keys in `.env` (e.g., `VITE_API_KEY=...`) and access via `import.meta.env.VITE_API_KEY` when using Vite.
  - Never commit secrets to version control.

**Debouncing user input (recommended for API calls)**
- Debounce prevents firing a request on every keystroke. Use `setTimeout` inside `useEffect` and clear it, or use libraries like `lodash.debounce`.

**How to wire everything to show filtered results (simple plan)**
1. In `App.jsx` add `const [results, setResults] = useState([])`.
2. Add `useEffect` watching `searchTerm` (with debounce): fetch API and call `setResults(data)`.
3. Create `Results` component that receives `results` and maps to rendered list.
4. Place `<Results results={results} />` below `<Search/>`.

**How to explain this to someone (presentation script / notes)**
- Slide 1 — Goal: Show the app UI and explain purpose (search movies).
- Slide 2 — Architecture: show `App` (state container) → `Search` (input) → `Results` (list). Emphasize single source of truth for search state.
- Slide 3 — Walk through `App.jsx` line-by-line (use the code block above). Explain `useState`, props, and the JSX structure.
- Slide 4 — Walk through `Search.jsx`: show how controlled inputs work and why `value` + `onChange` are used.
- Slide 5 — Discuss where API fetching belongs and show `useEffect` example with debounce.
- Slide 6 — Live demo: run `npm run dev`, type a search term, and show the value in the page; (then implement results fetching and show filtered list).

**Commands to run the project locally**
```powershell
npm install
npm run dev
```

**Quick tips / gotchas**
- If JSX syntax errors appear, check for stray tokens (e.g., `initialstate=""` is invalid — use `useState("")`).
- When moving logic between components, prefer lifting state up if multiple components need to read/update the same data.
- Use `className` (not `class`) in JSX for CSS classes.

**Where this file is saved**
- `ReactDetailNotes.md` at project root: `c:\Users\poorn\OneDrive\Documents\Desktop\react\first_react_project\ReactDetailNotes.md`

**If you'd like**
- I can add a `Results` component and wire a sample public API (or a mock dataset) so you can see filtering live.
- I can also convert these notes into a separate tab-style markdown inside `src/` if you prefer documentation to live with source files.

---

If you want, I can now:
- run the dev server and demonstrate the live search update, or
- wire a mock API and add a `Results` component and example `useEffect`.

Tell me which next step you want and I’ll continue.
