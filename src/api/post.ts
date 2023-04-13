import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { IPostViewItem } from "./types/getFeed";
import { IGetPostRequest } from "./types/getPostRequest";
import { ICreatePostResponse, ICreatePostRequest } from "./types/createPost";

export const postApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    "Post",
    "cyfeedApi"
  >
) => ({
  getPost: builder.query<IPostViewItem, IGetPostRequest>({
    query: ({ id }) => ({
      url: `/content/posts/${id}`,
      method: "GET",
    }),
    transformResponse: (response: IPostViewItem, meta, arg) => {
      return response;
    },
  }),
  deletePost: builder.mutation<IPostViewItem, IGetPostRequest>({
    query: ({ id }) => ({
      url: `/content/posts/${id}`,
      method: "DELETE",
    }),
  }),
  editPost: builder.mutation<IPostViewItem, IGetPostRequest>({
    query: ({ id }) => ({
      url: `/content/posts/${id}`,
      method: "UPDATE",
    }),
  }),
  createPost: builder.mutation<ICreatePostResponse, ICreatePostRequest>({
    query: (post) => ({
      url: `/content/posts`,
      method: "POST",
      body: post,
    }),
  }),
});
