import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import CustomError from "../misc/CustomError";
import { AuthRequest } from "../domain/Authenticate";
import * as contactService from "../services/contactService";
import { noDataErrMsg, signInRequiredMsg } from "../constants/common";

/**
 * Get all users.
 * @param {Request} req
 * @param {Response} res
 */
export const getContacts = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.authUser;

  if (!user_id) {
    throw new CustomError(signInRequiredMsg, StatusCodes.UNAUTHORIZED);
  }
  contactService
    .getContacts(user_id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Get a single contact by id.
 * @param {Request} req
 * @param {Response} res
 */
export const getContactById = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const contact_id: number = +req.params.id;
  const user_id = req.authUser;

  if (!user_id) {
    throw new CustomError(signInRequiredMsg, StatusCodes.UNAUTHORIZED);
  }

  contactService
    .getContactById(user_id, contact_id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

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
    throw new CustomError(noDataErrMsg, StatusCodes.BAD_REQUEST);
  }

  if (!user_id) {
    throw new CustomError(signInRequiredMsg, StatusCodes.UNAUTHORIZED);
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
 * Update an existing contact.
 * @param {Request} req
 * @param {Response} res
 */
export const updateContact = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const contact_id: number = +req.params.id;
  const currentUser = req.authUser;

  const { name, email, is_favorite, picture, address, phone, user_id } =
    req.body;

  if (!name && !email && !is_favorite && !picture && !address && !phone) {
    throw new CustomError(noDataErrMsg, StatusCodes.BAD_REQUEST);
  }

  if (!currentUser) {
    throw new CustomError(signInRequiredMsg, StatusCodes.UNAUTHORIZED);
  }

  contactService
    .updateContact(currentUser, {
      contact_id,
      name,
      email,
      is_favorite,
      picture,
      address,
      phone,
      user_id,
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
    throw new CustomError(signInRequiredMsg, StatusCodes.UNAUTHORIZED);
  }

  contactService
    .deleteContact(contact_id, user_id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
