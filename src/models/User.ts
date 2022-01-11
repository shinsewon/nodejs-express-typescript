import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

const Schema = mongoose.Schema;
const User = new Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false },
});

User.statics.create = function (username: string, password: string) {
  const user = new this({
    password,
    username,
  });
  return user.save();
};

User.statics.findOneByUsername = function (username: string) {
  return this.findOne({
    username,
  }).exec();
};

User.methods.verify = function (password: string) {
  return this.password === password;
};

User.methods.assignAdmin = function () {
  this.admin = true;
  return this.save();
};

export default mongoose.model<IUser & mongoose.Document>("User", User);
