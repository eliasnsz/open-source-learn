import { LessonProps } from "../types/user";
import prisma from "./connectToDatabase";

const lessonModel = {

  create: async ({ title, description, duration_in_seconds, video_url, courseId }: LessonProps) => {
    const lesson = await prisma.lesson.create({
      data: { 
        title, 
        description, 
        duration_in_seconds, 
        video_url, 
        courseId,
      }
    });
    
    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: { lessons: { connect: { id: lesson.id }} }
    });
    return { lesson, updatedCourse }; 
  },

  findAll: async (courseId: string) => {
    const childrenLessons = await prisma.lesson.findMany({ where: { courseId }});
    return childrenLessons;
  },

  findOne: async (courseId: string, lessonId: string) => {
    try {
      const findedLesson = await prisma.lesson.findFirst({
        where: { id: lessonId, courseId },
      });
      return findedLesson;

    } catch (error) {
      console.log(error);
    }
  },

  delete: async (lessonId: string) => {
    await prisma.lesson.delete({
      where: { id: lessonId },
    });
    return;
  },

  changeLessonCheck: async (lessonId: string) => {
    try {
      const findedLesson = await prisma.lesson.findFirst({
        where: { id: lessonId },
      });
      
      await prisma.lesson.update({
        where: { id: findedLesson?.id },
        data: { isChecked: !findedLesson?.isChecked }
      });

    } catch (error) {
      console.log(error);
    }
  }

};

export default lessonModel;