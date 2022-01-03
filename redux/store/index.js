import { combineReducers } from "@reduxjs/toolkit";
import { accountReducer } from "../slices/accountSlice";

export default combineReducers({
  account: accountReducer,
});
