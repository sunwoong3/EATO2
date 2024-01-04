import CryptoJS from "crypto-js";

const encryptPwd = (data) => {
  let { password } = data;
  password = CryptoJS.AES.encrypt(
    password,
    process.env.REACT_APP_SECRET_KEY
  ).toString();

  const encryptData = Object.assign(data, { password });

  return encryptData;
};

const decryptPwd = (data) => {
  let { password } = data;
  password = CryptoJS.AES.decrypt(
    password,
    process.env.REACT_APP_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);

  const decryptData = Object.assign(data, { password });

  return decryptData;
};

export { encryptPwd, decryptPwd };
