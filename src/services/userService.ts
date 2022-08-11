import StatusCodes from "http-status-codes";

import UserModel from "../models/UserModel";
import { UserToInsertInterface, UserToReturnInterface } from "../domain/User";
import { generatePasswordHash } from "../utils/passwordUtil";
import CustomError from "../misc/CustomError";
import Success from "../domain/Success";

/**
 * Create a new user.
 * @param {UserToInsertInterface} user
 * @returns {Promise<Success<UserToReturnInterface>>}
 */
export const createUser = async (
  user: UserToInsertInterface
): Promise<Success<UserToReturnInterface | void>> => {
  const { password } = user;

  const passwordHash = await generatePasswordHash(password);

  const newUser = await UserModel.createUser({
    ...user,
    password: passwordHash,
  }).catch((err) => {
    if (err.code == 23505) {
      throw new CustomError(
        "User with the email already exist",
        StatusCodes.CONFLICT
      );
    }
    throw new CustomError(
      "Database error while creating the user",
      StatusCodes.CONFLICT
    );
  });

  return {
    data: newUser,
    message: "User created successfully.",
  };
};
