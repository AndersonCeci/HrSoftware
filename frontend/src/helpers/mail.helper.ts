import { message } from "antd";
import axios from "axios";

const API = import.meta.env.REACT_APP_MAIL_API;

interface EmailData {
  sender?: string;
  recepients: string[];
  subject: string;
  text: string;
  name: string;
  email: string;
  password?: string;
  hr: string;
}

export const sendMailHelper = async (
  template: string,
  emailData: EmailData
) => {
  try {
    const res = await axios.post(API, { template, emailData });
    return res.data;
  } catch (error) {
    message.error("Failed to send mail");
  }
};
