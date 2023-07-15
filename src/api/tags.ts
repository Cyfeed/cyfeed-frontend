import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { IGetTagsResponse } from "./types/getTags";

export const tagsApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    "Post" | "Posts",
    "cyfeedApi"
  >
) => ({
  tags: builder.query<IGetTagsResponse, void>({
    query: () => ({
      url: "/tags",
      method: "GET",
    }),
    // transformResponse: (response: IGetTagsResponse) =>
    //   response.map((tag) => ({ label: tag.name, value: tag.id })),
  }),
});
