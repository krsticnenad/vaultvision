import { combineReducers } from "@reduxjs/toolkit";
import { reducer as cdpReducer } from "../slices/cdp-data";

export const rootReducer = combineReducers({
    cdp: cdpReducer,
});