import { Request, Response } from "express";
import { NotFoundError, ValidationError } from "../errors";
import { messages } from "joi-translation-pt-br";

import Joi from "joi";
import courseModel from "../models/course";

const courseController = {

  findAll: async (_req: Request, res: Response) => {
    const allCourses = await courseModel.findAll();
    return res.status(200).json(allCourses);
  },

  findById: async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const findedCourse = await courseModel.findById(courseId);

    if (!findedCourse) {
      const error = new NotFoundError({
        message: "O recurso solicitado não foi encontrado no sistema.",
      });
      return res.status(error.statusCode).json(error);
    }
    
    return res.status(200).json(findedCourse);
  },

  create: async (req: Request, res: Response) => {
    const courseSchema = Joi.object({
      title: Joi.string().required(),
      thumbnail_url: Joi.string().required(),
    });
    
    const { error } = courseSchema.validate(req.body, { messages });
    
    if (error) { 
      const errorToSend = new ValidationError({
        message: error.message,
        statusCode: 400
      });
      return res.status(errorToSend.statusCode).json(errorToSend);
    }

    await courseModel.create({ ...req.body });
    return res.status(201).end(); 
  }, 

  delete: async (req: Request, res: Response) => {
    const { courseId } = req.params;
    
    const deleteSchema = Joi.object({ courseId: Joi.string().required() });
    const { error } = deleteSchema.validate({ courseId }, { messages });
    
    if (error) { 
      const errorToSend = new ValidationError({
        message: error.message,
        statusCode: 400
      });
      return res.status(errorToSend.statusCode).json(errorToSend);
    }

    await courseModel.delete(courseId);
    res.status(204).end();
  },

};

export default courseController;