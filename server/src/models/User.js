import mongoose from "mongoose";
import crypto from "crypto";
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
    roles: { type: String, default: "user" },
  },
  {
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  new Promise(async (resolve, reject) => {
    crypto.pbkdf2(
      user.password,
      process.env.SALT_VALUE,
      100000,
      64,
      "sha512",
      async (err, key) => {
        if (err) reject(err);
        resolve((user.password = key.toString("base64")));
        next();
      }
    );
  });
});

userSchema.methods.matchPassword = async function (pwd, userPwd) {
  const isValidPassword =
    crypto
      .pbkdf2Sync(pwd, process.env.SALT_VALUE, 100000, 64, "sha512")
      .toString("base64") === userPwd;
  return isValidPassword;
};

const User = mongoose.model("User", userSchema);
export default User;
