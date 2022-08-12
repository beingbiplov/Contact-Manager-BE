import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import * as authService from "../services/authService";
import CustomError from "../misc/CustomError";
import { AuthRequest } from "../domain/Authenticate";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError(
      "email and password are required",
      StatusCodes.BAD_REQUEST
    );
  }

  authService
    .authenticateUser({ email, password })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const getAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refresh_token } = req.body;

  authService
    .getAccessToken(refresh_token)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const deleteRefreshToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.authUser;

  if (!userId) {
    throw new CustomError("User id required", StatusCodes.BAD_REQUEST);
  }

  authService
    .deleteRefreshToken(userId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
