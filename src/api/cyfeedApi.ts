import { communicationApi } from "./communication";
import { createApi } from "@reduxjs/toolkit/query/react";

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
  tagTypes: ["Post", "Posts"],
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
