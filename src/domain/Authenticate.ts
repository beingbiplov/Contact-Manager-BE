import { Request } from "express";

interface AuthorizedRequest extends Request {
  authUser?: number;
}

export interface TokenPayload {
  data: number;
}

export type AuthRequest = AuthorizedRequest;
export type DataStoredInToken = TokenPayload;
