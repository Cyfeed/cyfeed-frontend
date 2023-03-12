import { IUser } from "./createUser";

export interface IGetUserByIdResponse extends IUser {
  status: EStatus;
}

export enum ENetworkType {
  Linkedin = "linkedin",
  Twitter = "twitter",
  Telegram = "telegram",
  Website = "website",
  Facebook = "facebook",
}

export enum EStatus {
  Active = "active",
  Pending = "pending",
  Decline = "decline",
}

export interface IGetUserByIdRequest {}
