import db from "../db/db";
import ContactInterface, {
  ContactToInsertInterface,
  ContactToUpdateInterface,
} from "../domain/Contact";

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

  public static async getContacts(
    user_id: number
  ): Promise<ContactInterface[]> {
    const contacts = await db(ContactModel.table)
      .where({ "contact.user_id": user_id })
      .select(
        "contact.*",
        "phone_number.phone_id",
        "phone_number.phone_number",
        "phone_number.label"
      )
      .leftJoin(
        "phone_number",
        "contact.contact_id",
        "=",
        "phone_number.contact_table_id"
      );

    return contacts;
  }

  public static async getContactById(
    contact_id: number
  ): Promise<ContactInterface> {
    const user = await db(ContactModel.table)
      .where({ contact_id: contact_id })
      .select(
        "contact.*",
        "phone_number.phone_id",
        "phone_number.phone_number",
        "phone_number.label"
      )
      .leftJoin(
        "phone_number",
        "contact.contact_id",
        "=",
        "phone_number.contact_table_id"
      )
      .first();

    return user;
  }

  public static async createContact(
    contact: ContactToInsertInterface
  ): Promise<ContactInterface[]> {
    const newContact = db(ContactModel.table).insert(
      contact,
      ContactModel.toReturnFields
    );

    return newContact;
  }

  public static async updateContact(
    contact: ContactToUpdateInterface
  ): Promise<ContactInterface> {
    const [updatedContact] = await db(ContactModel.table)
      .where({ contact_id: contact.contact_id })
      .update(contact)
      .returning(ContactModel.toReturnFields);

    return updatedContact;
  }

  public static async deleteContact(contact_id: number): Promise<number> {
    const deletedContact = await db(ContactModel.table)
      .where({ contact_id: contact_id })
      .delete();

    return deletedContact;
  }

  public static async getContactOwner(
    contact_id: number
  ): Promise<ContactInterface> {
    const contactOwner = await db(ContactModel.table)
      .where({ contact_id: contact_id })
      .select(["user_id"])
      .first();

    return contactOwner;
  }
}

export default ContactModel;
