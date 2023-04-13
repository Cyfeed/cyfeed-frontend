import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  IPostCommentParent,
  IGetPostCommentsRequest,
} from "./types/getPostComments";
import { IPostCommentResponse, IPostCommentRequest } from "./types/postComment";

export const commentsApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    "Post",
    "cyfeedApi"
  >
) => ({
  getPostComments: builder.query<IPostCommentParent[], IGetPostCommentsRequest>(
    {
      query: ({ postId }) => ({
        url: `/comment/${postId}`,
        method: "GET",
      }),
      transformResponse: (response: IPostCommentParent[]) => {
        return response;
      },
    }
  ),
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
});
