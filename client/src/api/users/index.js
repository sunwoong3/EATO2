import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/v2/users`;

export const test = async (data) => {
  try {
    console.log(data);
    console.log(`${API_URL}`);
    await axios.get(`${API_URL}`);
  } catch (err) {
    console.log(err.message);
  }
};

export const signUp = async (data) => {
  try {
    console.log(data);
    console.log(`${API_URL}/signUp`);
    await axios
      .post(`${API_URL}/signUp`, { data })
      .then((res) => console.log(res));
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
