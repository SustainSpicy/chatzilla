import { createStore } from "redux";
import rootReducer from "./rootReducer.js";
import { composeWithDevTools } from "redux-devtools-extension";
function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem("store", serializedStore);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, composeWithDevTools());
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
