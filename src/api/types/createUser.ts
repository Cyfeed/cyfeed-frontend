export enum ENetworkType {
  LinkedIn = "linkedin",
  Twitter = "twitter",
  Telegram = "telegram",
  Website = "website",
  Facebook = "facebook",
}

enum EStatus {
  Active = "active",
  Pending = "pending",
  Decline = "decline",
}

export interface ICreateUserRequest {
  email: string;
  firstname: string;
  introduction: string;
  lastname: string;
  linkedin?: string;
  position: string;
  username: string;
  work: string;
}

export interface IUser {
  details: {
    joinedAt: string;
    networks: [
      {
        link: string;
        type: ENetworkType;
      }
    ];
    position: string;
    work: string;
  };
  email: string;
  firstname: string;
  id: string;
  introduction: string;
  lastname: string;
  status: EStatus;
  username: string;
}

export interface ICreateUserResponse extends IUser {}
