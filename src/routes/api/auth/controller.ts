import { Request, Response } from "express";

export class Controller {
  static register = (req: Request, res: Response) => {
    res.send("this router is working");
  };
}
