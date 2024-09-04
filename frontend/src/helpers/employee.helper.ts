import { message } from "antd";
import axios from "axios";

const API = import.meta.env.REACT_APP_EMPLOYEE_SEARCH_API;
const FETCH_EMPLOYEE_API = import.meta.env.REACT_APP_EMPLOYEE_API;

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

export const fetchEmployeeByID = async (id: string) => {
  try {
    const res = await axios.get(`${FETCH_EMPLOYEE_API}/${id}`);
    return res.data;
  } catch (error) {
    message.error("Failed to fetch employee");
    return null;
  }
};
