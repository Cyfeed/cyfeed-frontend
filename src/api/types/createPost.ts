import { EPostType } from "./getFeed";

export interface ICreatePostRequest {
  link?: string;
  text?: string;
  tagsIds?: string[];
  title: string;
  type: EPostType;
}

export interface ICreatePostResponse {
  author: string;
  id: string;
  link: string;
  publishedAt: string;
  text: string;
  title: string;
  type: EPostType;
}

export interface ICreatePostError {
  code: string;
  details: {
    description: string;
  };
  message: string;
  translationKey: string;
}
