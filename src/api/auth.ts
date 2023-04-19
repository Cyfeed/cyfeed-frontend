import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ICreateUserResponse, ICreateUserRequest } from "./types/createUser";
import { IGetAuthCodeResponse, IGetAuthCodeRequest } from "./types/getAuthCode";
import { IGetUserByIdResponse } from "./types/getUserById";
import { ILoginResponse, ILoginRequest } from "./types/login";
import { IUpdateUserResponse, IUpdateUserRequest } from "./types/updateUser";
import {
  IUpdateUserIntroResponse,
  IUpdateUserIntroRequest,
} from "./types/updateUserIntro";

export const authApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    "Post" | "Posts",
    "cyfeedApi"
  >
) => ({
  createUser: builder.mutation<ICreateUserResponse, ICreateUserRequest>({
    query: (userData) => ({
      url: `auth/users`,
      method: "POST",
      body: userData,
    }),
  }),
  updateUser: builder.mutation<IUpdateUserResponse, IUpdateUserRequest>({
    query: (userData) => ({
      url: `auth/users`,
      method: "PUT",
      body: userData,
    }),
  }),
  updateUserIntro: builder.mutation<
    IUpdateUserIntroResponse,
    IUpdateUserIntroRequest
  >({
    query: ({ introduction }) => ({
      url: `/auth/users/intro`,
      method: "PUT",
      body: { introduction },
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
  me: builder.query<IGetUserByIdResponse, void>({
    query: () => ({
      url: "/auth/users/id/me",
      method: "GET",
    }),
  }),
  getUserById: builder.query<IGetUserByIdResponse, string>({
    query: (userId) => ({
      url: `/auth/users/id/${userId}`,
      method: "GET",
    }),
  }),
  getUserByUsername: builder.query<IGetUserByIdResponse, string>({
    query: (username) => ({
      url: `/auth/users/${username}`,
      method: "GET",
    }),
  }),
});
