import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { TGetReactionsResponse } from "./types/getReactions";
import { IPutReactionResponse, IPutReactionRequest } from "./types/putReaction";

export const reactionsApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    "Post" | "Posts",
    "cyfeedApi"
  >
) => ({
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
  removeReaction: builder.mutation<IPutReactionResponse, IPutReactionRequest>({
    query: ({ reactionId, postId }) => ({
      method: "DELETE",
      url: `/reaction/${reactionId}/${postId}`,
    }),
  }),
});
