// import { PrismaClient } from "@prisma/client";

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import courseRouter from "./routes/courses";

const PORT = 3001;
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/users", authRouter);
app.use("/user", userRouter);
app.use("/courses", courseRouter);

app.listen(PORT, () => console.log("🚀 Server running on port " + PORT));