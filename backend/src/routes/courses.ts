import { Router } from "express";

import sessionMiddlewares from "../middlewares/session";
import courseController from "../controllers/course";
import lessonController from "../controllers/lesson";

const route = Router();

route.get("/", sessionMiddlewares.jwtVerify, courseController.findAll);
route.get("/:courseId", sessionMiddlewares.jwtVerify, courseController.findById);
route.get("/:courseId/lessons", sessionMiddlewares.jwtVerify, lessonController.findAll);
route.get("/:courseId/lessons/:lessonId", sessionMiddlewares.jwtVerify, lessonController.findOne);

route.post("/", sessionMiddlewares.jwtVerify, courseController.create); 
route.post("/:courseId/lessons", sessionMiddlewares.jwtVerify, lessonController.create);

route.put("/:courseId/lessons/:lessonId", sessionMiddlewares.jwtVerify, lessonController.changeLessonCheck  );

route.delete("/:courseId", sessionMiddlewares.jwtVerify, courseController.delete);
route.delete("/:courseId/lessons/:lessonId", sessionMiddlewares.jwtVerify, lessonController.delete);


export default route;