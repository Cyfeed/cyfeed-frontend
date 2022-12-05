export interface IGetUserByIdResponse {
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

enum ENetworkType {
  Linkedin = "linkedin",
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

export interface IGetUserByIdRequest {}
