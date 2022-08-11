import db from "../db/db";
import { UserToInsertInterface, UserToReturnInterface } from "../domain/User";

class UserModel {
  private static table = "user_account";
  private static toReturnFields = ["id", "name", "email"];

  public static async createUser(
    user: UserToInsertInterface
  ): Promise<UserToReturnInterface[]> {
    const newUser = db(UserModel.table).insert(user, UserModel.toReturnFields);

    return newUser;
  }
}

export default UserModel;
