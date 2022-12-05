export interface ILoginRequest {
  authCode: string;
  email: string;
  loginToken: string;
}

export interface ILoginResponse {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  sessionId: string;
}

export interface ILoginResponseError {
  code: string;
  details: {
    description: string;
  };
  message: string;
  translationKey: string;
}
