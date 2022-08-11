import db from "../db/db";
import { UserToInsertInterface, UserToReturnInterface } from "../domain/User";

class UserModel {
  private static table = "user_account";
  private static toReturnFields = ["id", "name", "email"];

  public static async getUsers(): Promise<UserToReturnInterface[]> {
    const users = await db(UserModel.table).select(UserModel.toReturnFields);

    return users;
  }

  public static async getUserById(id: number): Promise<UserToReturnInterface> {
    const user = await db(UserModel.table)
      .where({ id: id })
      .select(UserModel.toReturnFields)
      .first();

    return user;
  }

  public static async getUserByEmail(
    email: string
  ): Promise<UserToReturnInterface> {
    const user = await db(UserModel.table)
      .where({ email: email })
      .select(UserModel.toReturnFields)
      .first();

    return user;
  }

  public static async createUser(
    user: UserToInsertInterface
  ): Promise<UserToReturnInterface[]> {
    const newUser = db(UserModel.table).insert(user, UserModel.toReturnFields);

    return newUser;
  }
}

export default UserModel;
