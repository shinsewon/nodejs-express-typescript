import { Router } from "express";
import { Controller as controller } from "./auth/controller";

export const router = Router();

router.use("/auth", controller.register);

export default router;
