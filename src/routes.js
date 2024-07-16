import express from "express";
import cors from "cors";
import TodoController from "../controller/TodoController.js";

const TodoRouter = express.Router();
TodoRouter.use(express.json());
TodoRouter.use(cors());

TodoRouter.get("/", TodoController.index);
TodoRouter.post("/", TodoController.create);

export { TodoRouter };