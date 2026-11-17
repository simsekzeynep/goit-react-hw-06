import test from "node:test";
import assert from "node:assert/strict";
import { configureStore } from "@reduxjs/toolkit";
import contactsReducer, {
  addContact,
  deleteContact,
  selectContacts,
} from "../src/redux/contactsSlice.js";
import filtersReducer, {
  changeFilter,
  selectNameFilter,
} from "../src/redux/filtersSlice.js";

const createTestStore = () =>
  configureStore({
    reducer: { contacts: contactsReducer, filters: filtersReducer },
  });

test("required Redux state shape starts empty", () => {
  const state = createTestStore().getState();
  assert.deepEqual(state, { contacts: { items: [] }, filters: { name: "" } });
});

test("addContact and selectContacts work", () => {
  const store = createTestStore();
  const contact = { id: "id-1", name: "Rosie Simpson", number: "459-12-56" };
  store.dispatch(addContact(contact));
  assert.deepEqual(selectContacts(store.getState()), [contact]);
});

test("deleteContact removes only matching ID", () => {
  const store = createTestStore();
  store.dispatch(addContact({ id: "id-1", name: "Rosie", number: "123" }));
  store.dispatch(addContact({ id: "id-2", name: "Eden", number: "456" }));
  store.dispatch(deleteContact("id-1"));
  assert.deepEqual(
    selectContacts(store.getState()).map((contact) => contact.id),
    ["id-2"],
  );
});

test("changeFilter and selectNameFilter work", () => {
  const store = createTestStore();
  store.dispatch(changeFilter("ros"));
  assert.equal(selectNameFilter(store.getState()), "ros");
});
