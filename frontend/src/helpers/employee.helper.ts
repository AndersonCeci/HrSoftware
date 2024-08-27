import { message } from "antd";
import axios from "axios";

const API = import.meta.env.REACT_APP_EMPLOYEE_SEARCH_API;

export const fetchEmployee = async (name: string, surname: string) => {
  try {
    const res = await axios.get(API, {
      params: { name, surname },
    });
    return res.data;
  } catch (error) {
    message.error("Failed to fetch employee");
    return null;
  }
};
