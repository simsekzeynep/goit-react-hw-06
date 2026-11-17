# Phonebook — GoIT React Homework 06

A small phonebook rebuilt from HW-03 with **Redux Toolkit** and **Redux Persist**. UI and form validation stay simple and familiar.

## Features

- Add a contact with a name and telephone number; Formik + Yup validate both fields (required, 3–50 characters).
- Find contacts by name (case insensitive).
- Delete a contact by ID.
- **Persist only `contacts.items`** across reloads with Redux Persist; the search filter resets on reload.
- Redux selectors (`selectContacts`, `selectNameFilter`) and actions (`addContact`, `deleteContact`, `changeFilter`).
- All UI components use CSS Modules and default exports. Only `Contact` accepts a `contact` prop.

## Project structure

```text
src/
  components/
    App/ App.jsx, App.module.css
    ContactForm/ ContactForm.jsx, ContactForm.module.css
    SearchBox/ SearchBox.jsx, SearchBox.module.css
    ContactList/ ContactList.jsx, ContactList.module.css
    Contact/ Contact.jsx, Contact.module.css
  redux/
    store.js
    contactsSlice.js
    filtersSlice.js
  main.jsx
```

## Install & run

Node.js 20.19+ or 22.12+ (or newer supported release) is required for Vite 7.

```bash
npm install
npm run dev
```

**Windows App Control note:** The Rollup override in `package.json` selects the official WebAssembly alternative (`@rollup/wasm-node`). This avoids native Rollup binary execution blocked by Windows App Control on some computers. It can be slower than native Rollup, but does not require disabling Windows security protections.

## Checks

```bash
npm run format
npm run lint
npm test
npm run build
```

Tests cover reducers and selectors as well as the required structure. `npm install` generates `package-lock.json`, which should be committed.

## Publish

1. Create a **public** GitHub repository named `goit-react-hw-06`.
2. Commit and push the project, including `package-lock.json` after installation.
3. Import the repository into Vercel using the **Vite** preset; `npm run build` is the build command and `dist` is the output directory.
4. Submit **both** the GitHub repository URL and the Vercel live site URL.

No API key or environment variables are needed.

## Implementation note

The homework explicitly asks for an empty initial contact list. Unlike HW-03's seeded demo contacts, the first run displays an empty state. The Redux Persist storage key is `persist:contacts`; `filters.name` is never saved.
