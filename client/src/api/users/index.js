import axios from "axios";
import { encryptPwd } from "middleware/index.js";

const API_URL = `${process.env.REACT_APP_API_URL}/v2/users`;

export const signUp = async (data) => {
  try {
    await axios.post(`${API_URL}/signUp`, encryptPwd(data), { data });
  } catch (err) {
    console.log(err.message);
  }
};

export const login = async (data) => {
  try {
    await axios.post(`${API_URL}/login`, { data });
  } catch (err) {
    console.log(err.message);
  }
};

export const logout = async (data) => {
  try {
    await axios.post(`${API_URL}/logout`, { data });
  } catch (err) {
    console.log(err.message);
  }
};
