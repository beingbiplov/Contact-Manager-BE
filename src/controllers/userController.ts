import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";

import CustomError from "../misc/CustomError";
import * as UserService from "../services/userService";

/**
 * Create a new user.
 * @param {Request} req
 * @param {Response} res
 */
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError(
      "name, email and password are required",
      StatusCodes.BAD_REQUEST
    );
  }

  UserService.createUser({
    name,
    email,
    password,
  })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
