import StatusCodes from "http-status-codes";

import UserModel from "../models/UserModel";
import {
  UserToInsertInterface,
  UserToReturnInterface,
  UserToUpdateInterface,
} from "../domain/User";
import { generatePasswordHash } from "../utils/passwordUtils";
import CustomError from "../misc/CustomError";
import Success from "../domain/Success";
import { resourceFetchedSuccessMsg } from "../constants/common";

/**
 * Get a single user by id.
 * @param {number} id
 * @returns {Promise<Success<UserToReturnInterface>>}
 */
export const getUserById = async (
  id: number
): Promise<Success<UserToReturnInterface>> => {
  const user = await UserModel.getUserById(id);

  if (!user) {
    throw new CustomError("Invalid Id", StatusCodes.NOT_FOUND);
  }

  return {
    data: user,
    message: resourceFetchedSuccessMsg,
  };
};

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

/**
 * Update an existing user.
 * @param {UserInterface} user
 * @returns {Promise<Success<UserToReturnInterface>>}
 */
export const updateUser = async (
  user: UserToUpdateInterface
): Promise<Success<UserToReturnInterface | void>> => {
  const { password } = user;
  let userToUpdate = { ...user };

  if (password) {
    const passwordHash = await generatePasswordHash(password);
    userToUpdate = { ...user, password: passwordHash };
  }

  const updatedUser = await UserModel.updateUser(userToUpdate);

  if (!updatedUser) {
    throw new CustomError("User does not exist.", StatusCodes.BAD_REQUEST);
  }

  return {
    data: updatedUser,
    message: "User updated successfully",
  };
};
