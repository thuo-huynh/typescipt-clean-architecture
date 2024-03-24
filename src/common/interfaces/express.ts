import { Response } from 'express';

export interface ErrorDetail {
  errorCode: string | undefined;
  errorMessage: string | undefined;
}

export interface BodyResponse {
  httpStatusCode: number;
  data?: any;
  errors?: ErrorDetail[];
}
export interface Session {
  userId: string;
  loginId: string;
}

declare module 'express' {
  interface Request {
    session: Session;
  }
}
export type ResponseCustom = Response<BodyResponse>;
