import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CdpData } from "../interfaces/cdp-data";

interface State {
    data: CdpData[] | [];
    notFound: false;
}

const initialState: State = {
    data: [],
    notFound: false,
}

const reducers = {
    setCdpData(state: State, action: PayloadAction<any>): void {
        Object.assign(state, action.payload);
    }
}

export const slice = createSlice({
    name: 'cdp-data',
    initialState: initialState,
    reducers: reducers,
});

export const { reducer } = slice;