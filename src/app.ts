import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "./config/index";
import router from "./routes/api";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.set("jwt-secret", config.secret);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello JWT");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

mongoose.connect(config.mongodbUri);
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("connected to mongodb server");
});
