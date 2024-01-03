import CryptoJS from "crypto-js";

const encryptPwd = (data) => {
  let { password } = data;
  password = CryptoJS.AES.encrypt(process.env.SECRET_KEY, password).toString();

  const encryptData = Object.assign(data, { password });

  return encryptData;
};

const decryptPwd = (data) => {
  let { password } = data;
  password = CryptoJS.AES.decrypt(process.env.SECRET_KEY, password).toString(
    CryptoJS.enc.Utf8
  );

  const decryptData = Object.assign(data, { password });

  return decryptData;
};

export { encryptPwd, decryptPwd };
