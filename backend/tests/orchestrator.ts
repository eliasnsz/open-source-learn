import prisma from "../src/models/connectToDatabase";

const dropAllUsers = async () => {
  await prisma.user.deleteMany();
};

export default { dropAllUsers };