import { ENetworkType, IUser } from "./createUser";
import { EStatus } from "./getUserById";

export interface IUpdateUserRequest {
  userData: {
    networks: {
      link: string;
      type: ENetworkType;
    }[];
    position: string;
    work: string;
  };
  userId: string;
}

export interface IUpdateUserResponse extends IUser {
  status: EStatus;
}
