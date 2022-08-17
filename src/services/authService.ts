import { StatusCodes } from "http-status-codes";

import { userAuthInterface } from "../domain/User";
import UserModel from "../models/UserModel";
import Success from "../domain/Success";
import RefreshToken from "../models/RefreshToken";
import CustomError from "../misc/CustomError";
import { checkPasswordMatch } from "../utils/passwordUtils";
import TokenInterface from "../domain/Token";
import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
} from "../utils/tokenUtils";

export const authenticateUser = async (
  userData: userAuthInterface
): Promise<Success<TokenInterface>> => {
  const matchedUser = await UserModel.getUserByEmail(userData.email);

  if (!matchedUser) {
    throw new CustomError(
      "user with the email does not exist",
      StatusCodes.UNAUTHORIZED
    );
  }

  const isPasswordCorrect = await checkPasswordMatch(
    matchedUser.password,
    userData.password
  );

  if (isPasswordCorrect) {
    const { password, ...dataToReturn } = matchedUser;

    const accessToken = createAccessToken(dataToReturn.id);

    const refreshToken = createRefreshToken(dataToReturn.id);

    await RefreshToken.createRefreshToken({
      refresh_token: refreshToken,
      user_id: dataToReturn.id,
      expires_at: new Date(Date.now() + 300000),
    });

    return {
      data: { accessToken, refreshToken, userData: dataToReturn },
      message: "User login successful!",
    };
  } else {
    throw new CustomError(
      "Username and password didn't match!",
      StatusCodes.UNAUTHORIZED
    );
  }
};

export const getAccessToken = async (
  refresh_token: string
): Promise<Success<string>> => {
  const existingToken = await RefreshToken.getRefreshToken(refresh_token);

  if (!existingToken) {
    throw new CustomError("Invalid refresh token", StatusCodes.UNAUTHORIZED);
  }

  if (existingToken.expires_at < new Date()) {
    throw new CustomError("Refresh token expired", StatusCodes.UNAUTHORIZED);
  }

  const userId = verifyAccessToken(existingToken.refresh_token);

  const access_token = createAccessToken(userId);

  return {
    data: access_token,
    message: "Access token created successful",
  };
};

export const deleteRefreshToken = async (
  userId: number
): Promise<Success<TokenInterface>> => {
  const deletedToken = await RefreshToken.deleteByUserId(userId);

  if (!deletedToken) {
    throw new CustomError("Token does not exist.", StatusCodes.BAD_REQUEST);
  }

  return {
    message: "Refresh token deleted successfully",
  };
};
