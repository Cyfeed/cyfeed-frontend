import { ACCESS_TOKEN } from "../../constants";
import { IGetUserByIdResponse } from "./../../api/types/getUserById";
import type { PayloadAction } from "@reduxjs/toolkit";
import { REFRESH_TOKEN } from "./../../constants";
import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";

const getToken = (type: string) => {
  if (typeof window === "undefined") {
    return;
  }

  const accessToken = window.localStorage.getItem(type);

  return accessToken ? JSON.parse(accessToken) : accessToken;
};

const initialState = {
  user: null,
  accessToken: getToken(ACCESS_TOKEN) ?? null,
  refreshToken: getToken(REFRESH_TOKEN) ?? null,
};

export interface IAuthState {
  user: IGetUserByIdResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const slice = createSlice({
  name: "auth",
  initialState: initialState as IAuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { accessToken, refreshToken },
      }: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.accessToken = accessToken ?? null;
      state.refreshToken = refreshToken;
    },
    resetCredentials: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },

    setUser: (
      state,
      { payload: { user } }: PayloadAction<{ user: IGetUserByIdResponse }>
    ) => {
      state.user = user;
    },
  },
});

export const { setCredentials, resetCredentials, setUser } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
