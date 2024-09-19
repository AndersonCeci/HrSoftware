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

export const fetchEmployees = async (ids: string[]) => {
  try {
    console.log("Fetching employees", ids);
    const stringIds = ids.join(",");
    const res = await axios.post(`${FETCH_EMPLOYEE_API}/employees`, stringIds);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      message.error(
        error.response?.data?.message || "Failed to fetch employees"
      );
    } else {
      message.error("An unexpected error occurred");
    }
    return null;
  }
};
