export default interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface userAuthInterface {
  email: string;
  password: string;
}

export type UserToInsertInterface = Omit<UserInterface, "id">;
export type UserToReturnInterface = Omit<UserInterface, "password">;
export type UserToUpdateInterface = Omit<UserInterface, "email">;
