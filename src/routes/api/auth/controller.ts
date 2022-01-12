import { Request, Response } from "express";
// import User from "../../../models/User";
const User = require("../../../models/User");

export class Controller {
  static register = (req: Request, res: Response) => {
    const { username, password } = req.body;
    let newUser: any = null;

    const create = (user: { username: string; password: string }) => {
      if (user) {
        throw new Error("username exist");
      } else {
        return User.create(username, password);
      }
    };

    const count = (user: any) => {
      newUser = user;
      return User.count({}).exec();
    };

    const assign = (count: number) => {
      if (count === 1) {
        return newUser.assignAdmin();
      } else {
        return Promise.resolve(false);
      }
    };

    const respond = (isAdmin: any) => {
      res.json({
        message: "registered successfully",
        admin: !!isAdmin,
      });
    };

    const onError = (error: Error) => {
      res.status(409).json({
        message: error.message,
      });
    };

    User.findOneByUsername(username)
      .then(create)
      .then(count)
      .then(assign)
      .then(respond)
      .catch(onError);
  };

  static login = (req: Request, res: Response) => {
    res.send("login api is working");
  };
}
