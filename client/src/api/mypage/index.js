import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/v2/mypage`;

export const get = async (data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let res = await axios.get(`${API_URL}/${data.userId}`, headers);
    return res;
  } catch (err) {
    console.log(err.message);
  }
};

export const modify = async (data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let res = await axios.patch(`${API_URL}/modify`, { data }, headers);
    return res;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteUser = async (data) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    let res = await axios.delete(`${API_URL}/delete`, { data }, headers);
    return res;
  } catch (err) {
    console.log(err.message);
  }
};
