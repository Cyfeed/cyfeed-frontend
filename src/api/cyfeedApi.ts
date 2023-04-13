import { communicationApi } from "./communication";
import { createApi } from "@reduxjs/toolkit/query/react";

import { ICreateUserRequest, ICreateUserResponse } from "./types/createUser";
import { IGetAuthCodeRequest, IGetAuthCodeResponse } from "./types/getAuthCode";
import { IGetFeedRequest, IGetFeedResponse } from "./types/getFeed";
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

import { TGetReactionsResponse } from "./types/getReactions";
import { IGetTagsResponse, TGetTagsResponseTransformed } from "./types/getTags";
import { IGetUserByIdResponse } from "./types/getUserById";
import { IPostCommentRequest, IPostCommentResponse } from "./types/postComment";
import { ISignInToWaitingListRequest } from "./types/signToWaitingList";
import { IUpdateUserRequest, IUpdateUserResponse } from "./types/updateUser";
import { isEqual } from "lodash-es";

import { baseQueryWithReauth } from "./baseQuery";
import { postApi } from "./post";
import { commentsApi } from "./comments";
import { tagsApi } from "./tags";
import { authApi } from "./auth";
import { feedApi } from "./feed";
import { reactionsApi } from "./reactions";

export const cyfeedApi = createApi({
  reducerPath: "cyfeedApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    ...authApi(builder),
    ...communicationApi(builder),
    ...feedApi(builder),
    ...postApi(builder),
    ...commentsApi(builder),
    ...tagsApi(builder),
    ...reactionsApi(builder),
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
  useRemoveReactionMutation,
  useDeletePostMutation,
  useEditPostMutation,
} = cyfeedApi;
