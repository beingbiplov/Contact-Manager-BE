import { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";

import CustomError from "../misc/CustomError";
import * as userService from "../services/userService";

/**
 * Get all users.
 * @param {Request} req
 * @param {Response} res
 */
export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  userService
    .getUsers()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Get a single user by id.
 * @param {Request} req
 * @param {Response} res
 */
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  userService
    .getUserById(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

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

  userService
    .createUser({
      name,
      email,
      password,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Update an existing user.
 * @param {Request} req
 * @param {Response} res
 */
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const id: number = +req.params.id;

  const { name, password } = req.body;

  if (!password && !name) {
    throw new CustomError("data not provided", StatusCodes.BAD_REQUEST);
  }

  userService
    .updateUser({
      id,
      name,
      password,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Delete an existing user.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  userService
    .deleteUser(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};