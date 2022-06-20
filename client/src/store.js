import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
const initialState = {};
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
  // compose(
  //   applyMiddleware(thunk),
  //   window.devToolsExtension ? window.devToolsExtension() : (f) => f
  // )
);
