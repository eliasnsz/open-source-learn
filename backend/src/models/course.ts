import { CourseProps } from "../types/user";
import prisma from "./connectToDatabase";

const courseModel = {

  findAll: async () => {
    return await prisma.course.findMany();
  },

  findById: async (id: string) => {
    try {
      return await prisma.course.findFirst({ where: { id }, include: { lessons: true }}); 
    } catch (error) {
      console.log(error);
    }
  },

  create: async ({ title, thumbnail_url }: CourseProps) => {
    const created = await prisma.course.create({ data: { title, thumbnail_url, lessons: { create: [] } }});
    return created;
  }, 
  
  delete: async (id: string) => {
    return await prisma.course.delete({ where: { id }});
  }, 

};

export default courseModel;