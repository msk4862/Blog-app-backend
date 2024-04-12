import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
  const SALT = await bcrypt.genSalt();
  const hash = await bcrypt.hash(rawPassword, SALT);
  return hash;
}

export async function isPasswordMatching(
  rawPassword: string,
  passwordHash: string,
) {
  const isMatch = await bcrypt.compare(rawPassword, passwordHash);
  return isMatch;
}
