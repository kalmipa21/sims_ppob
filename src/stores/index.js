import { combineReducers, createStore } from "redux";
import useReducerAuth from "./modules/auth";
import useReducerLoading from "./modules/loading";
import useReduceProfileBalance from "./modules/profilebalance";

const rootReducer = combineReducers({
  auth: useReducerAuth,
  loading: useReducerLoading,
  profilebalance: useReduceProfileBalance,
});

export default createStore(rootReducer);
