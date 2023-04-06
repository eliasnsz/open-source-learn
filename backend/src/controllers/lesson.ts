import { Request, Response } from "express";
import { NotFoundError, ValidationError } from "../errors";
import { messages } from "joi-translation-pt-br"; 

import Joi from "joi";
import lessonModel from "../models/lesson";
import courseModel from "../models/course";

const lessonController = {

  findAll: async (req: Request, res: Response) => {
    const { courseId } = req.params;
    
    const parentCourseFinded = await courseModel.findById(courseId);
    
    if (!parentCourseFinded) {
      const errorToSend = new ValidationError({
        message: "Curso inexistente.",
        statusCode: 400
      });
      return res.status(errorToSend.statusCode).json(errorToSend);
    }

    const findedLessons = await lessonModel.findAll(courseId);
    
    return res.status(200).json(findedLessons);
  },

  findOne: async (req: Request, res: Response) => {
    const { courseId, lessonId } = req.params;
    
    const parentCourseFinded = await courseModel.findById(courseId);
    
    if (!parentCourseFinded) {
      const errorToSend = new ValidationError({
        message: "Curso inexistente.",
        statusCode: 400
      });
      return res.status(errorToSend.statusCode).json(errorToSend);
    }

    const findedLesson = await lessonModel.findOne(courseId, lessonId);
    
    if (!findedLesson) {
      const error = new NotFoundError({
        message: "O recurso solicitado não foi encontrado no sistema.",
      });
      return res.status(error.statusCode).json(error);
    }

    return res.status(200).json(findedLesson);
  },

  create: async (req: Request, res: Response) => {
    const { courseId } = req.params;
    
    const lessonSchema = Joi.object({
      title: Joi.string().required(), 
      description: Joi.string().required(), 
      duration_in_seconds: Joi.number().required(), 
      video_url: Joi.string().required()
    });

    const { error } = lessonSchema.validate(req.body, { messages });

    if (error) { 
      const errorToSend = new ValidationError({
        message: error.message,
        statusCode: 400
      });
      return res.status(errorToSend.statusCode).json(errorToSend);
    }

    const parentCourseFinded = await courseModel.findById(courseId);
    
    if (!parentCourseFinded) {
      const errorToSend = new ValidationError({
        message: "Curso inexistente.",
        statusCode: 400
      });
      return res.status(errorToSend.statusCode).json(errorToSend);
    }
    
    await lessonModel.create({ ...req.body, courseId: courseId });
    return res.status(201).end();
  },

  delete: async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    await lessonModel.delete(lessonId);

    return res.status(204).end();
  },

  changeLessonCheck: async(req: Request, res: Response) => {
    const { lessonId } = req.params;
    await lessonModel.changeLessonCheck(lessonId);

    return res.status(204).end();
  },

};

export default lessonController;