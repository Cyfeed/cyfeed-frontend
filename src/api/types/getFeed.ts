export interface IGetFeedResponse {
  paging: IPaging;
  posts: IPost[];
}

interface IPaging {
  index: number;
  total: number;
}

export interface IPost {
  author: string;
  commentsCount: number;
  id: string;
  link?: string;
  reactions?: IPostReaction[];
  tags?: IPostTag[];
  publishedAt: string;
  title: string;
  type: EPostType;
}

export interface IPostViewItem extends IPost {
  text?: string;
}

export interface IPostTag {
  id: string;
  name: string;
}

export interface IPostReaction {
  count: number;
  id: string;
  imageURL: string;
  name: string;
}

export enum EPostType {
  Post = "post",
  Link = "link",
  Qa = "qa",
}

export interface IGetFeedRequest {
  type: "latest" | "top";
  index?: number;
  size?: number;
}
