import db from "../db/db";
import {
  PhoneInterface,
  PhoneToInsertInterface,
  PhoneToReturnInterface,
} from "../domain/Contact";

class PhoneModel {
  private static table = "phone_number";
  private static toReturnFields = ["phone_id", "phone_number", "label"];

  public static async createPhone(
    phone: PhoneToInsertInterface
  ): Promise<PhoneToReturnInterface[]> {
    const newPhone = db(PhoneModel.table).insert(
      phone,
      PhoneModel.toReturnFields
    );

    return newPhone;
  }

  public static async updatePhone(
    phone: PhoneInterface
  ): Promise<PhoneInterface> {
    const [updatedPhone] = await db(PhoneModel.table)
      .where({ phone_id: phone.phone_id })
      .update(phone)
      .returning(PhoneModel.toReturnFields);

    return updatedPhone;
  }

  public static async getPhoneOwner(
    phone_id: number
  ): Promise<PhoneToReturnInterface> {
    const contactOwner = await db(PhoneModel.table)
      .where({ phone_id: phone_id })
      .select(["contact_table_id"])
      .first();

    return contactOwner;
  }
}

export default PhoneModel;
