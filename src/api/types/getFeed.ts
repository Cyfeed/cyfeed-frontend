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
  id: string;
  link: string;
  publishedAt: string;
  title: string;
  type: EPostType;
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
