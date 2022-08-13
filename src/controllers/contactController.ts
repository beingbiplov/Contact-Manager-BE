import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import CustomError from "../misc/CustomError";
import { AuthRequest } from "../domain/Authenticate";
import * as contactService from "../services/contactService";

/**
 * Create a new contact.
 * @param {Request} req
 * @param {Response} res
 */
export const createContact = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, email, is_favorite, picture, address, phone } = req.body;

  const user_id = req.authUser;

  if (!name || !phone) {
    throw new CustomError(
      "name and phone fields are required",
      StatusCodes.BAD_REQUEST
    );
  }

  if (!user_id) {
    throw new CustomError(
      "user needs to be signed in",
      StatusCodes.BAD_REQUEST
    );
  }

  contactService
    .createContact({
      name,
      email,
      is_favorite,
      picture,
      address,
      user_id,
      phone,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Delete an existing contact.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteContact = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const contact_id: number = +req.params.id;
  const user_id = req.authUser;

  if (!user_id) {
    throw new CustomError(
      "user needs to be signed in",
      StatusCodes.BAD_REQUEST
    );
  }

  contactService
    .deleteContact(contact_id, user_id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
