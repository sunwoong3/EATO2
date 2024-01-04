import axios from "axios";
import { encryptPwd } from "middleware/index.js";

const API_URL = `${process.env.REACT_APP_API_URL}/v2/users`;

export const signUp = async (data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let res = await axios.post(
      `${API_URL}/signUp`,
      encryptPwd(data),
      { data },
      headers
    );
    return res;
  } catch (err) {
    console.log(err.message);
  }
};

export const login = async (data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let res = await axios.post(`${API_URL}/login`, encryptPwd(data), headers);
    return res;
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = async (data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let res = await axios.post(`${API_URL}/logout`, { data }, headers);
    return res;
  } catch (err) {
    console.log(err.message);
  }
};
