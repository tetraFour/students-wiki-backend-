import { Schema, model, Document } from "mongoose";

export interface IUserModel extends Document {
  id: string;
  name: string;
  email: string;
  login: string;
  password: string;
  avatar?: string;
  is_verified: boolean;
}

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  is_verified: { type: Boolean, default: false },
});


const UserModel = model<IUserModel>("User", User);

export default UserModel;
