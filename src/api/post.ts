import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { IPostViewItem } from "./types/getFeed";
import { IGetPostRequest } from "./types/getPostRequest";
import { ICreatePostResponse, ICreatePostRequest } from "./types/createPost";
import { IEditPostRequest } from "./types/editPost";

export const postApi = (
  builder: EndpointBuilder<
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    "Post" | "Posts",
    "cyfeedApi"
  >
) => ({
  getPost: builder.query<IPostViewItem, IGetPostRequest>({
    query: ({ id }) => ({
      url: `/content/posts/${id}`,
      method: "GET",
    }),
    providesTags: ["Post"],
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
  editPost: builder.mutation<IPostViewItem, IEditPostRequest>({
    query: ({ id, post }) => ({
      url: `/content/posts/${id}`,
      method: "PUT",
      body: post,
    }),
    invalidatesTags: ["Post"],
  }),
  createPost: builder.mutation<ICreatePostResponse, ICreatePostRequest>({
    query: (post) => ({
      url: `/content/posts`,
      method: "POST",
      body: post,
    }),
  }),
});
