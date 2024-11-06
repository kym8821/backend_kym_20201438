import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import projectRoute from "./src/controller/projectController.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
app.use("/projects", projectRoute);
app.listen(8000, () => {
  console.log(`app is listening on http://localhost:${8000}`);
});