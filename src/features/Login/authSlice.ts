import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES_AT,
  REFRESH_TOKEN,
} from "../../constants";
import { RootState } from "../../store";
import { IGetUserByIdResponse } from "./../../api/types/getUserById";

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
  accessTokenExpiresAt: getToken(ACCESS_TOKEN_EXPIRES_AT) ?? null,
};

const saveCredentials = ({
  accessToken,
  refreshToken,
  accessTokenExpiresAt,
}: {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
}) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
  window.localStorage.setItem(REFRESH_TOKEN, JSON.stringify(refreshToken));
  window.localStorage.setItem(
    ACCESS_TOKEN_EXPIRES_AT,
    JSON.stringify(accessTokenExpiresAt)
  );
};

const clearCredentials = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(REFRESH_TOKEN);
  window.localStorage.removeItem(ACCESS_TOKEN_EXPIRES_AT);
};

export interface IAuthState {
  user: IGetUserByIdResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: string | null;
}

const slice = createSlice({
  name: "auth",
  initialState: initialState as IAuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { accessToken, refreshToken, accessTokenExpiresAt },
      }: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        accessTokenExpiresAt: string;
      }>
    ) => {
      state.accessToken = accessToken ?? null;
      state.refreshToken = refreshToken;
      state.accessTokenExpiresAt = accessTokenExpiresAt;

      saveCredentials({ accessToken, refreshToken, accessTokenExpiresAt });
    },
    resetCredentials: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpiresAt = null;

      clearCredentials();
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpiresAt = null;
      state.user = null;

      clearCredentials();
    },

    setUser: (
      state,
      { payload: { user } }: PayloadAction<{ user: IGetUserByIdResponse }>
    ) => {
      state.user = user;
    },
  },
});

export const { setCredentials, resetCredentials, setUser, logout } =
  slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectAccessTokenExpiresAt = (state: RootState) =>
  state.auth.accessTokenExpiresAt;
