import { Router } from "express";
import { Controller as controller } from "./controller";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

export default { router };
