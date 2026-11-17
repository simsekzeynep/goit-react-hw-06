import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const exists = (path) => existsSync(new URL(`../${path}`, import.meta.url));

const components = [
  "App",
  "Contact",
  "ContactForm",
  "ContactList",
  "SearchBox",
];

test("all components have matching CSS Modules and default exports", () => {
  for (const name of components) {
    const jsx = `src/components/${name}/${name}.jsx`;
    const css = `src/components/${name}/${name}.module.css`;
    assert.equal(exists(jsx), true, jsx);
    assert.equal(exists(css), true, css);
    assert.match(read(jsx), /export default/);
  }
});

test("only Contact receives component props", () => {
  for (const name of ["App", "ContactForm", "ContactList", "SearchBox"]) {
    assert.match(
      read(`src/components/${name}/${name}.jsx`),
      new RegExp(`function ${name}\\(\\)`),
    );
  }
  assert.match(
    read("src/components/Contact/Contact.jsx"),
    /function Contact\(\{ contact \}\)/,
  );
});

test("redux persist is scoped to contacts items, not filters", () => {
  const store = read("src/redux/store.js");
  assert.match(store, /key: "contacts"/);
  assert.match(store, /whitelist: \["items"\]/);
  assert.match(
    store,
    /contacts: persistReducer\(contactsPersistConfig, contactsReducer\)/,
  );
  assert.match(store, /filters: filtersReducer/);
  assert.match(store, /persistStore\(store\)/);
  assert.match(read("src/main.jsx"), /PersistGate/);
});

test("App does not contain component-level state or storage code", () => {
  const app = read("src/components/App/App.jsx");
  assert.doesNotMatch(app, /useState|useEffect|localStorage/);
});
