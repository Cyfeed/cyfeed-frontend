import { ACCESS_TOKEN } from "../../constants";
import { IGetUserByIdResponse } from "./../../api/types/getUserById";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { createSlice } from "@reduxjs/toolkit";

const getAccessToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  const accessToken = window.localStorage.getItem(ACCESS_TOKEN);

  return accessToken ? JSON.parse(accessToken) : accessToken;
};

const initialState = {
  user: null,
  accessToken: getAccessToken() ?? null,
};

export interface IAuthState {
  user: IGetUserByIdResponse | null;
  accessToken?: string;
}

const slice = createSlice({
  name: "auth",
  initialState: initialState as IAuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { accessToken } }: PayloadAction<{ accessToken: string }>
    ) => {
      state.accessToken = accessToken;
    },

    setUser: (
      state,
      { payload: { user } }: PayloadAction<{ user: IGetUserByIdResponse }>
    ) => {
      state.user = user;
    },
  },
});

export const { setCredentials, setUser } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
