import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors";
import { messages } from "joi-translation-pt-br";

import Joi from "joi";

const dataValidation = (req: Request, res: Response, next: NextFunction) => {
  
  const loginScheam = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = loginScheam.validate(req.body, { messages });
  
  if (error) { 
    const errorToSend = new ValidationError({
      message: error.message,
      statusCode: 400
    });

    return res.status(errorToSend.statusCode).json(errorToSend);
  }
  
  next();
};

const loginMiddleware = { dataValidation };
export default loginMiddleware;