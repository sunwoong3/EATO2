import CryptoJS from "crypto-js";

const encryptPwd = (password) => {
  const encryptPwd = CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_KEY
  ).toString();

  return encryptPwd;
};

const decryptPwd = (password) => {
  let decryptPwd = CryptoJS.AES.decrypt(password, process.env.SECRET_KEY);
  decryptPwd = decryptPwd.toString(CryptoJS.enc.Utf8);

  return decryptPwd;
};

export { encryptPwd, decryptPwd };
