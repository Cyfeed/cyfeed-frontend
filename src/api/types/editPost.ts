import { ICreatePostRequest } from "./createPost";
export interface IEditPostRequest {
  post: ICreatePostRequest;
  id: string;
}
