import { Router } from "express";

import registerMiddleware from "../middlewares/register";
import sessionMiddlewares from "../middlewares/session";
import loginMiddleware from "../middlewares/login";
import authController from "../controllers/auth";
import dotenv from "dotenv";

const route = Router();

dotenv.config();

route.post("/register", 
  registerMiddleware.dataValidation,
  registerMiddleware.checkIfExistsSameUserOrEmail,
  authController.createAccount
);

route.post("/login", 
  loginMiddleware.dataValidation,
  authController.logIn
);

route.get("/logout", 
  sessionMiddlewares.jwtVerify,
  authController.logout
);

export default route;