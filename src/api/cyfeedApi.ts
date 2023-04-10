import { createApi } from "@reduxjs/toolkit/query/react";
import { ICreatePostRequest, ICreatePostResponse } from "./types/createPost";
import { ICreateUserRequest, ICreateUserResponse } from "./types/createUser";
import { IGetAuthCodeRequest, IGetAuthCodeResponse } from "./types/getAuthCode";
import {
  IGetFeedRequest,
  IGetFeedResponse,
  IPostViewItem,
} from "./types/getFeed";
import { ILoginRequest, ILoginResponse } from "./types/login";
import { IPutReactionRequest, IPutReactionResponse } from "./types/putReaction";
import {
  IUpdateUserIntroRequest,
  IUpdateUserIntroResponse,
} from "./types/updateUserIntro";

import {
  IGetPostCommentsRequest,
  IPostCommentParent,
} from "./types/getPostComments";
import { IGetPostRequest } from "./types/getPostRequest";
import { TGetReactionsResponse } from "./types/getReactions";
import { IGetTagsResponse, TGetTagsResponseTransformed } from "./types/getTags";
import { IGetUserByIdResponse } from "./types/getUserById";
import { IPostCommentRequest, IPostCommentResponse } from "./types/postComment";
import { ISignInToWaitingListRequest } from "./types/signToWaitingList";
import { IUpdateUserRequest, IUpdateUserResponse } from "./types/updateUser";
import { isEqual } from "lodash-es";

import { baseQueryWithReauth } from "./baseQuery";

export const cyfeedApi = createApi({
  reducerPath: "cyfeedApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
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
    /**
     * Communication
     */
    signToWaitingList: builder.mutation<void, ISignInToWaitingListRequest>({
      query: (email) => ({
        url: "/communication/email",
        method: "POST",
        body: email,
      }),
    }),
    /**
     * CONTENT
     */
    getFeed: builder.query<
      { data: IGetFeedResponse; arg: IGetFeedRequest },
      IGetFeedRequest
    >({
      query: ({ type, index = 0, size = 10 }) => ({
        url: `/content/feed?type=${type}&index=${index}&size=${size}`,
        method: "GET",
      }),
      providesTags: ["Post"],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (currentCache.arg.type !== newItems.arg.type) {
          return newItems;
        }

        currentCache.data.posts?.push(...newItems.data.posts);
        currentCache.data.paging = newItems.data.paging;
        currentCache.arg = newItems.arg;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return !isEqual(currentArg, previousArg);
      },
      transformResponse: (response: IGetFeedResponse, meta, arg) => {
        return { data: response, arg };
      },
    }),

    getPost: builder.query<IPostViewItem, IGetPostRequest>({
      query: ({ id }) => ({
        url: `/content/posts/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IPostViewItem, meta, arg) => {
        return response;
      },
    }),
    getPostComments: builder.query<
      IPostCommentParent[],
      IGetPostCommentsRequest
    >({
      query: ({ postId }) => ({
        url: `/comment/${postId}`,
        method: "GET",
      }),
      transformResponse: (response: IPostCommentParent[]) => {
        return response;
      },
    }),
    sendPostComment: builder.query<IPostCommentResponse, IPostCommentRequest>({
      query: ({ postId, parent, text }) => ({
        url: `/comment/${postId}`,
        method: "POST",
        body: { parent, text },
      }),
      transformResponse: (response: IPostCommentResponse) => {
        return response;
      },
    }),
    createPost: builder.mutation<ICreatePostResponse, ICreatePostRequest>({
      query: (post) => ({
        url: `/content/posts`,
        method: "POST",
        body: post,
      }),
    }),
    tags: builder.query<TGetTagsResponseTransformed, void>({
      query: () => ({
        url: "/tags",
        method: "GET",
      }),
      transformResponse: (response: IGetTagsResponse) =>
        response.map((tag) => ({ label: tag.name, value: tag.id })),
    }),
    getReactions: builder.query<TGetReactionsResponse, void>({
      query: () => ({
        method: "GET",
        url: "/reactions",
      }),
    }),
    putReaction: builder.mutation<IPutReactionResponse, IPutReactionRequest>({
      query: ({ reactionId, postId }) => ({
        method: "PUT",
        url: `/reaction/${reactionId}/${postId}`,
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
  useGetPostQuery,
  useGetPostCommentsQuery,
  useLazyGetPostCommentsQuery,
  useSignToWaitingListMutation,
  useLazySendPostCommentQuery,
  useTagsQuery,
  useGetReactionsQuery,
  usePutReactionMutation,
  useUpdateUserMutation,
  useUpdateUserIntroMutation,
  useGetUserByIdQuery,
  useGetUserByUsernameQuery,
} = cyfeedApi;
