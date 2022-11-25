import { ICreateUserRequest, ICreateUserResponse } from "./types/createUser";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cyfeedApi = createApi({
  reducerPath: "cyfeedApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.cyfeed.co/api/" }),
  endpoints: (builder) => ({
    createUser: builder.mutation<ICreateUserResponse, ICreateUserRequest>({
      query: (userData) => ({
        url: `auth/users`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = cyfeedApi;
