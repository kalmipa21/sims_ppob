import { combineReducers, createStore } from "redux";
import useReducerAuth from "./modules/auth";
import useReducerLoading from "./modules/loading";
import useReduceProfileBalance from "./modules/profilebalance";
import useReducerService from "./modules/service";

const rootReducer = combineReducers({
  auth: useReducerAuth,
  loading: useReducerLoading,
  profilebalance: useReduceProfileBalance,
  service: useReducerService,
});

export default createStore(rootReducer);
