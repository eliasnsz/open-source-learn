import { Request, Response } from "express";
import { ValidationError } from "../errors";
import { UserProps } from "../types/user";

import jwt from "jsonwebtoken";

import isMatchPass from "../utils/isMatchPass";
import user from "../models/user";

const createAccount = async (req: Request, res: Response) => {
  const { name, email, password }: UserProps = req.body;
  await user.create({ name, email, password });
  return res.status(201).end();
};

const logIn = async (req: Request, res: Response) => {
  const { email, password }: UserProps = req.body;
  const findedUser = await user.findByEmail(email);
  
  if (!findedUser) {
    const error = new ValidationError({
      message: "Email ou senha inexistentes",
      statusCode: 400
    });
    return res.status(error.statusCode).json(error);
  }
  
  if (!isMatchPass(password, findedUser.password)) {
    const error = new ValidationError({
      message: "Senha incorreta",
      statusCode: 401
    });
    return res.status(error.statusCode).json(error);
  }

  const userSecureOutput = {
    id: findedUser.id,
    name: findedUser.name,
    email: findedUser.email,
    created_at: findedUser.created_at
  };

  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ user: userSecureOutput }, secret, { expiresIn: "7d" });
  
  return res.status(200).json({ token, user: userSecureOutput });
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("session");
  res.status(200).end();
};

const authController = { createAccount, logIn, logout };
export default authController;