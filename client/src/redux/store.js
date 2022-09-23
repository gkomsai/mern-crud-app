import { legacy_createStore,applyMiddleware,combineReducers } from "redux";
import thunk from "redux-thunk";
import { AppReducer } from "./app/reducer";
import { AuthReducer } from "./auth/reducer";



const rootReducer = combineReducers({ AppReducer, AuthReducer });


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()