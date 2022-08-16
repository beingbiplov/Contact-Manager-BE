export interface PhoneInterface {
  phone_id: number;
  phon_number: number;
  label?: string;
}

export default interface ContactInterface {
  contact_id: number;
  name: string;
  is_favorite?: boolean;
  email?: string;
  address?: string;
  picture?: string;
  user_id: number;
  phone: PhoneInterface;
}

export interface PhoneToReturnInterface extends PhoneInterface {
  contact_table_id: number;
}

export type FullContactToInsertInterface = Omit<ContactInterface, "contact_id">;
export type ContactToInsertInterface = Omit<
  ContactInterface,
  "contact_id" | "phone"
>;
export type ContactToUpdateInterface = Omit<
  ContactInterface,
  "user_id" | "phone"
>;
export type PhoneToInsertInterface = Omit<PhoneToReturnInterface, "phone_id">;
