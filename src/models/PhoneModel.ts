import db from "../db/db";
import {
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
}

export default PhoneModel;
