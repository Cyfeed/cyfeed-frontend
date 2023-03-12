import { ENetworkType, IUser } from "./createUser";
import { EStatus } from "./getUserById";

export interface IUpdateUserRequest {
  networks: {
    link: string;
    type: ENetworkType;
  }[];
  position: string;
  work: string;
}

export interface IUpdateUserResponse extends IUser {
  status: EStatus;
}
