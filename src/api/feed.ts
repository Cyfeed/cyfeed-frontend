import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

import { IGetFeedResponse, IGetFeedRequest } from "./types/getFeed";

export const feedApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    "Post",
    "cyfeedApi"
  >
) => ({
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
      return newItems;

      // if (currentCache.arg.type !== newItems.arg.type) {
      //   return newItems;
      // }

      // currentCache.data.posts?.push(...newItems.data.posts);
      // currentCache.data.paging = newItems.data.paging;
      // currentCache.arg = newItems.arg;
    },
    // Refetch when the page arg changes
    forceRefetch({ currentArg, previousArg }) {
      return true;
      // return !isEqual(currentArg, previousArg);
    },
    transformResponse: (response: IGetFeedResponse, meta, arg) => {
      return { data: response, arg };
    },
  }),
});
