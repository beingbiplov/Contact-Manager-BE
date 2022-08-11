import db from "../db/db";
import {
  RefreshTokenInterface,
  RefreshTokenToInsertInterface,
} from "../domain/Token";

class RefreshToken {
  private static table = "refresh_token";

  public static async getRefreshToken(
    refresh_token: string
  ): Promise<RefreshTokenInterface> {
    const getRefreshToken = await db(RefreshToken.table)
      .select()
      .where({ refresh_token })
      .first();

    return getRefreshToken;
  }

  public static async createRefreshToken(
    refreshToken: RefreshTokenToInsertInterface
  ): Promise<RefreshTokenInterface[]> {
    const newRefreshToken = await db(RefreshToken.table).insert(refreshToken, [
      "id",
      "refresh_token",
      "user_id",
      "expires_at",
    ]);

    return newRefreshToken;
  }

  public static async deleteByUserId(userId: number): Promise<number> {
    const deletedToken = await db(RefreshToken.table)
      .where({ user_id: userId })
      .delete();

    return deletedToken;
  }
}

export default RefreshToken;
