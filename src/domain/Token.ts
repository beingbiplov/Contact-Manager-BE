export default interface TokenInterface {
  accessToken: string;
  refreshToken: string;
  userData?: {};
}

export interface RefreshTokenInterface {
  id: number;
  refresh_token: string;
  user_id: number;
  expires_at: Date;
}

export type RefreshTokenToInsertInterface = Omit<RefreshTokenInterface, "id">;
