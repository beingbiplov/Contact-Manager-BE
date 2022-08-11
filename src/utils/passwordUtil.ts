import bcrypt from "bcrypt";

export const generatePasswordHash = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  return passwordHash;
};
