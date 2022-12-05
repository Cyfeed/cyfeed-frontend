import { ICreatePostRequest, ICreatePostResponse } from "./types/createPost";
import { ICreateUserRequest, ICreateUserResponse } from "./types/createUser";
import { IGetAuthCodeRequest, IGetAuthCodeResponse } from "./types/getAuthCode";
import { IGetFeedRequest, IGetFeedResponse, IPost } from "./types/getFeed";
import { ILoginRequest, ILoginResponse } from "./types/login";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IGetUserByIdResponse } from "./types/getUserById";
import { RootState } from "../store";

export const cyfeedApi = createApi({
  reducerPath: "cyfeedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.cyfeed.co/api/",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token && endpoint !== "refreshToken") {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    /**
     * AUTH
     * */
    createUser: builder.mutation<ICreateUserResponse, ICreateUserRequest>({
      query: (userData) => ({
        url: `auth/users`,
        method: "POST",
        body: userData,
      }),
    }),
    getLoginCode: builder.mutation<IGetAuthCodeResponse, IGetAuthCodeRequest>({
      query: ({ email }) => ({
        url: "/auth/users/code",
        method: "POST",
        body: { email },
      }),
    }),
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (loginData) => ({
        url: "/auth/users/login",
        method: "POST",
        body: loginData,
      }),
    }),
    refreshToken: builder.mutation<ILoginResponse, string>({
      query: (refreshToken) => ({
        url: "/auth/token/refresh",
        method: "POST",
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      }),
    }),
    me: builder.query<IGetUserByIdResponse, void>({
      query: () => ({
        url: "/auth/users/id/me",
        method: "GET",
      }),
    }),

    /**
     * CONTENT
     */
    getFeed: builder.query<IPost[], IGetFeedRequest>({
      query: ({ type, index = 0, size = 10 }) => ({
        url: `/content/feed?type=${type}&index=${index}&size=${size}`,
        method: "GET",
      }),
      transformResponse: (response: IGetFeedResponse, meta, arg) => {
        return response.posts;
      },
    }),
    createPost: builder.mutation<ICreatePostResponse, ICreatePostRequest>({
      query: (post) => ({
        url: `/content/posts`,
        method: "POST",
        body: post,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetLoginCodeMutation,
  useLoginMutation,
  useGetFeedQuery,
  useLazyMeQuery,
  useMeQuery,
  useCreatePostMutation,
  useRefreshTokenMutation,
} = cyfeedApi;
