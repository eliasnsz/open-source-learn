import { UserProps } from "../types/user";
import encryptPassword from "../utils/encryptPassword";

import prisma from "./connectToDatabase";

const create = async (data: UserProps) => {
  const hashedPassword = await encryptPassword(data.password);
  return await prisma.user.create({ data: { ...data, password: hashedPassword } });
};

const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email }});
};

const findByName = async (name: string) => {
  return await prisma.user.findUnique({ where: { name }});
};

const findById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id }});
};

const user = { create, findByEmail, findByName, findById };
export default user;