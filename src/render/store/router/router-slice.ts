import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationInfo {
  pathname: string;
  search: string;
  hash: string;
  state: unknown;
}

export interface RouterState {
  baseUrl: string;
  moveTo: string;
  location: LocationInfo;
}

const initialState: RouterState = {
  baseUrl: "",
  moveTo: "",
  location: {
    pathname: "",
    search: "",
    hash: "",
    state: "",
  },
};

export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    locBaseUrl: (state, action: PayloadAction<{ baseUrl: string; path: LocationInfo }>) => {
      state.baseUrl = action.payload.baseUrl;
      state.location = { ...action.payload.path };
      state.moveTo = state.location.pathname;
    },
    locLocation(state, action: PayloadAction<LocationInfo>) {
      state.location = { ...action.payload };
    },
    locMoveTo(state, action: PayloadAction<string>) {
      state.moveTo = action.payload;
    },
  },
});

export const { locBaseUrl, locLocation, locMoveTo } = routerSlice.actions;
export default routerSlice.reducer;
