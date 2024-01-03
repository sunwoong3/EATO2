import CryptoJS from "crypto-js";

const encryptPwd = (password) => {
  const encryptPwd = CryptoJS.AES.encrypt(
    process.env.SECRET_KEY,
    password
  ).toString();

  return encryptPwd;
};

const decryptPwd = (password) => {
  const decryptPwd = CryptoJS.AES.decrypt(
    process.env.SECRET_KEY,
    password
  ).toString(CryptoJS.enc.Utf8);

  return decryptPwd;
};

export { encryptPwd, decryptPwd };
