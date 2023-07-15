import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import {
  selectAccessToken,
  selectRefreshToken,
  setCredentials,
  logout,
} from "../features/Login/authSlice";
import { RootState } from "../store";
import { ILoginResponse } from "./types/login";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.cyfeed.co/api/",
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const token = selectAccessToken(api.getState() as RootState);

  let result = await baseQuery(
    {
      ...(args as FetchArgs),
      headers: {
        ...(args as FetchArgs).headers,
        authorization: `Bearer ${token}`,
      },
    },
    api,
    extraOptions
  );

  if (result.error && result.error.status === 401) {
    const refreshToken = selectRefreshToken(api.getState() as RootState);

    const refreshResult = await baseQuery(
      {
        url: "/auth/token/refresh",
        method: "POST",
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const tokens = refreshResult.data as ILoginResponse;
      // store the new token
      api.dispatch(setCredentials(tokens));
      // retry the initial query
      result = await baseQuery(
        {
          ...(args as FetchArgs),
          headers: {
            ...(args as FetchArgs).headers,
            authorization: `Bearer ${tokens.accessToken}`,
          },
        },
        api,
        extraOptions
      );
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
