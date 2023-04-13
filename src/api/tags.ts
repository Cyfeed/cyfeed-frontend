import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { TGetTagsResponseTransformed, IGetTagsResponse } from "./types/getTags";

export const tagsApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    "Post",
    "cyfeedApi"
  >
) => ({
  tags: builder.query<TGetTagsResponseTransformed, void>({
    query: () => ({
      url: "/tags",
      method: "GET",
    }),
    transformResponse: (response: IGetTagsResponse) =>
      response.map((tag) => ({ label: tag.name, value: tag.id })),
  }),
});
