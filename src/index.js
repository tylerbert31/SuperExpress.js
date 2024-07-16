import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { TodoRouter } from "./routes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3030;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.head("/", (req, res) => {
    console.log("--Uptime Monitor--");
  res.send();
});

// Main Routes
app.use("/todo", TodoRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});