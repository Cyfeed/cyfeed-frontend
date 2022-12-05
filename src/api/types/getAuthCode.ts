export interface IGetAuthCodeRequest {
  email: string;
}

export interface IGetAuthCodeResponse {
  token: string;
}

export interface IGetAuthCodeResponseError {
  code: string;
  details: {
    description: string;
  };
  message: string;
  translationKey: string;
}
