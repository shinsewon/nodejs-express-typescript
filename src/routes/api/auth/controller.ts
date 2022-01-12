import { Request, Response } from "express";
const User = require("../../../models/User");
import jwt from "jsonwebtoken";
import { rejects } from "assert";

export class Controller {
  static register = (req: Request, res: Response) => {
    const { username, password } = req.body;
    let newUser: any = null;

    const create = (user: typeof User) => {
      if (user) {
        throw new Error("username exist");
      } else {
        return User.create(username, password);
      }
    };

    const count = (user: typeof User) => {
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
    const { username, password } = req.body;
    const secret = req.app.get("jwt-secret");
    const check = (user: typeof User) => {
      if (!user) {
        throw new Error("login failed");
      } else {
        if (user.verify(password)) {
          const { _id, username, admin } = user;
          return new Promise((resolve, reject) => {
            jwt.sign(
              {
                _id,
                username,
                admin,
              },
              secret,
              { expiresIn: "1d", issuer: "sewon.com", subject: "userInfo" },
              (err, token) => {
                if (err) reject(err);
                resolve(token);
              }
            );
          });
        } else {
          throw new Error("login failed");
        }
      }
    };

    const respond = (token: string) => {
      res.json({
        message: "logged in successfully",
        token,
      });
    };

    const onError = (error: Error) => {
      res.status(403).json({
        message: error.message,
      });
    };

    User.findOneByUsername(username).then(check).then(respond).catch(onError);
  };
}
