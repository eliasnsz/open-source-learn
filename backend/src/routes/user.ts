import { Router } from "express";
import sessionMiddlewares, { RequestWithUserData } from "../middlewares/session";

const route = Router();

route.get("/", sessionMiddlewares.jwtVerify, (req: RequestWithUserData, res) => {
  res.status(200).json(req.userData);
});

export default route;