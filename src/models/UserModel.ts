import db from "../db/db";
import UserInterface, {
  UserToInsertInterface,
  UserToReturnInterface,
  UserToUpdateInterface,
} from "../domain/User";

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

  public static async getUserByEmail(email: string): Promise<UserInterface> {
    const user = await db(UserModel.table)
      .where({ email: email })
      .select()
      .first();

    return user;
  }

  public static async createUser(
    user: UserToInsertInterface
  ): Promise<UserToReturnInterface[]> {
    const newUser = db(UserModel.table).insert(user, UserModel.toReturnFields);

    return newUser;
  }

  public static async updateUser(
    user: UserToUpdateInterface
  ): Promise<UserToReturnInterface> {
    const [updatedUser] = await db(UserModel.table)
      .where({ id: user.id })
      .update(user)
      .returning(UserModel.toReturnFields);

    return updatedUser;
  }

  public static async deleteUser(id: number): Promise<number> {
    const deletedUser = await db(UserModel.table).where({ id: id }).delete();

    return deletedUser;
  }
}

export default UserModel;
