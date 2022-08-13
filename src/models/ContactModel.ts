import db from "../db/db";
import ContactInterface, { ContactToInsertInterface } from "../domain/Contact";

class ContactModel {
  private static table = "contact";
  private static toReturnFields = [
    "contact_id",
    "name",
    "email",
    "is_favorite",
    "picture",
    "address",
    "user_id",
    "created_at",
  ];

  public static async createContact(
    contact: ContactToInsertInterface
  ): Promise<ContactInterface[]> {
    const newContact = db(ContactModel.table).insert(
      contact,
      ContactModel.toReturnFields
    );

    return newContact;
  }

  public static async deleteContact(contact_id: number): Promise<number> {
    const deletedContact = await db(ContactModel.table)
      .where({ contact_id: contact_id })
      .delete();

    return deletedContact;
  }

  public static async getContactOwner(contact_id: number): Promise<number> {
    const contactOwner = await db(ContactModel.table)
      .where({ contact_id: contact_id })
      .select(["user_id"])
      .first();

    return contactOwner;
  }
}

export default ContactModel;
