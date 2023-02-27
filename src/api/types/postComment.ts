import { IPostComment } from "./getPostComments";
export interface IPostCommentRequest {
  postId: string;
  text: string;
  parent?: string;
}

export interface IPostCommentResponse extends IPostComment {}
