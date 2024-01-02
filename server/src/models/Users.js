import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, unique: 1 },
    phone: { type: String, unique: 1 },
    nickname: { type: String, unique: 1 },
    password: String,
    name: String,
    location: String,
    grade: { type: String, default: "normal" },
    roles: { type: String, default: "normal" },
  },
  {
    versionKey: false,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  const password = await bcrypt.compare(enteredPassword, this.password);
  return password;
};

mongoose.model("User", userSchema);
