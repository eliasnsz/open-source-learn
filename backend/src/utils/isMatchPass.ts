import bcrypt from "bcrypt";

const isMatchPass = (password: string, hashedPassword: string) => {
  const isMatch = bcrypt.compareSync(password, hashedPassword);
  return isMatch; 
};

export default isMatchPass;