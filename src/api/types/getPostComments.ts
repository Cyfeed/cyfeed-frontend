type TCommentId = string;

export interface IPostComment {
  authorName: string;
  deleted: boolean;
  edited: boolean;
  id: TCommentId;
  parent: TCommentId;
  text: string;
}

export interface IPostCommentParent {
  comment: IPostComment;
  child?: IPostComment[];
}

export interface IGetPostCommentsRequest {
  postId: string;
}
