import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors";
import { UserProps } from "../types/user";
import { messages } from "joi-translation-pt-br";

import prisma from "../models/connectToDatabase";
import Joi from "joi";

const dataValidation = (req: Request, res: Response, next: NextFunction) => {
  
  const registerSchema = Joi.object({
    name: Joi.string().alphanum().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = registerSchema.validate(req.body, { messages });
  
  if (error) { 
    const errorToSend = new ValidationError({
      message: error.message,
      statusCode: 400
    });

    return res.status(errorToSend.statusCode).json(errorToSend);
  }
  
  next();
};

const checkIfExistsSameUserOrEmail = async (req: Request, res: Response, next: NextFunction) => {

  const { email, name }: UserProps = req.body;

  const findedUser = await prisma.user.findFirst({
    where: { OR: [{ name }, { email }] }
  });

  if (findedUser) {
    let message = "";
    
    if (findedUser?.name === name) {
      message = "O nome de usuário já está sendo utilizado";   
    } else if (findedUser?.email === email) {
      message = "O email já está sendo utilizado"; 
    }
    
    const error = new ValidationError({ 
      message: message,
      statusCode: 400
    });

    return res.status(error.statusCode).json(error);
  }

  next();
};

const registerMiddleware = { dataValidation, checkIfExistsSameUserOrEmail };
export default registerMiddleware;