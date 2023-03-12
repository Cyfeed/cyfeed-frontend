import { IUser } from "./createUser";
export interface IUpdateUserIntroRequest {
  introduction: string;
}

export interface IUpdateUserIntroResponse extends IUser {}
