import { StatusCodes } from "http-status-codes";

import ContactModel from "../models/ContactModel";
import PhoneModel from "../models/PhoneModel";
import ContactInterface, {
  FullContactToInsertInterface,
} from "../domain/Contact";
import Success from "../domain/Success";
import CustomError from "../misc/CustomError";

/**
 * Create a new contact.
 * @param {FullContactToInsertInterface} contact
 * @returns {Promise<Success<ContactInterface>>}
 */
export const createContact = async (
  contact: FullContactToInsertInterface
): Promise<Success<ContactInterface | void>> => {
  const { phone, ...contactData } = contact;

  const newContact = await ContactModel.createContact(contactData)
    .then(async (data) => {
      const newPhone = await PhoneModel.createPhone({
        contact_table_id: data[0].contact_id,
        ...phone,
      }).catch((err) => {
        throw new CustomError(err, StatusCodes.INTERNAL_SERVER_ERROR);
      });
      return { phoneData: newPhone[0], ...data[0] };
    })
    .catch((err) => {
      throw new CustomError(err, StatusCodes.INTERNAL_SERVER_ERROR);
    });

  return {
    data: newContact,
    message: "Contact created successfully",
  };
};

/**
 * Delete an existing contact.
 * @param {number, number} id, user_id
 * @returns {Promise<Success<>>}
 */
export const deleteContact = async (
  contact_id: number,
  user_id: number
): Promise<Success<ContactInterface>> => {
  const contactOwner = await ContactModel.getContactOwner(contact_id);

  if (user_id != contactOwner) {
    throw new CustomError(
      "You do not have access to perform this action",
      StatusCodes.FORBIDDEN
    );
  }

  const deletedContact = await ContactModel.deleteContact(contact_id);

  if (!deletedContact) {
    throw new CustomError("Contact does not exist.", StatusCodes.BAD_REQUEST);
  }

  return {
    message: "Contact deleted successfully",
  };
};
