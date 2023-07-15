import { IUser } from "./createUser";
export interface IUpdateUserIntroRequest {
  introduction: string;
  userId: string;
}

export interface IUpdateUserIntroResponse extends IUser {}
