import { StatusCodes } from "http-status-codes";

import ContactModel from "../models/ContactModel";
import PhoneModel from "../models/PhoneModel";
import ContactInterface, {
  FullContactToInsertInterface,
} from "../domain/Contact";
import Success from "../domain/Success";
import CustomError from "../misc/CustomError";
import { forbiddenErrMsg } from "../constants/common";

/**
 * Get all contacts.
 * @returns {Promise<Success<ContactInterface>>}
 */
export const getContacts = async (
  user_id: number
): Promise<Success<ContactInterface>> => {
  const contacts = await ContactModel.getContacts(user_id);

  return {
    data: contacts,
    message: "Users fetched successfully",
  };
};

/**
 * Get a single contact by id.
 * @param {number, number} user_id, contact_id
 * @returns {Promise<Success<ContactInterface>>}
 */
export const getContactById = async (
  user_id: number,
  contact_id: number
): Promise<Success<ContactInterface>> => {
  const contact = await ContactModel.getContactById(contact_id);

  if (!contact || user_id != contact.user_id) {
    throw new CustomError(forbiddenErrMsg, StatusCodes.FORBIDDEN);
  }

  return {
    data: contact,
    message: "User fetched successfully",
  };
};

/**
 * Create a new contact.
 * @param {FullContactToInsertInterface} contact
 * @returns {Promise<Success<ContactInterface>>}
 */
export const createContact = async (
  contact: FullContactToInsertInterface
): Promise<Success<ContactInterface>> => {
  const { phone, ...contactData } = contact;

  const newContact = await ContactModel.createContact(contactData)
    .then(async (data) => {
      const newPhone = await PhoneModel.createPhone({
        contact_table_id: data[0].contact_id,
        ...phone,
      }).catch((err) => {
        ContactModel.deleteContact(data[0].contact_id);
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
 * Update an existing contact.
 * @param {ContactInterface} contact
 * @returns {Promise<Success<ContactInterface>>}
 */
export const updateContact = async (
  currentUser: number,
  contact: ContactInterface
): Promise<Success<ContactInterface>> => {
  const { phone, ...contactData } = contact;

  const contactOwner = await ContactModel.getContactById(
    contactData.contact_id
  );

  const phoneOwner = await PhoneModel.getPhoneOwner(phone.phone_id);

  if (
    !contactOwner ||
    !phoneOwner ||
    currentUser != contactOwner.user_id ||
    phoneOwner.contact_table_id != contactData.contact_id
  ) {
    throw new CustomError(forbiddenErrMsg, StatusCodes.FORBIDDEN);
  }

  const updatedContact = await ContactModel.updateContact(contactData).then(
    async (data) => {
      if (phone) {
        const updatedPhone = await PhoneModel.updatePhone(phone).catch(
          (err) => {
            ContactModel.updateContact(contactOwner);
            throw new CustomError(err, StatusCodes.INTERNAL_SERVER_ERROR);
          }
        );
        return { phoneData: updatedPhone, ...data };
      }
      return data;
    }
  );

  if (!updatedContact) {
    throw new CustomError("Contact does not exist.", StatusCodes.BAD_REQUEST);
  }

  return {
    data: updatedContact,
    message: "Contact updated successfully",
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

  if (!contactOwner || user_id != contactOwner.user_id) {
    throw new CustomError(forbiddenErrMsg, StatusCodes.FORBIDDEN);
  }

  const deletedContact = await ContactModel.deleteContact(contact_id);

  if (!deletedContact) {
    throw new CustomError("Contact does not exist.", StatusCodes.BAD_REQUEST);
  }

  return {
    message: "Contact deleted successfully",
  };
};
