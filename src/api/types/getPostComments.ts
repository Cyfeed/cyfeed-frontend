type TCommentId = string;

export interface IPostComment {
  author: {
    authorName?: string;
    id: string;
    workPosition?: string;
  };
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
