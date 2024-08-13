import { Card } from "antd";
import ChangeLanguage from "./components/ChangeLanguage";
import ChangePasswordForm from "./components/ChangePasswordForm";
import { PasswordProvider } from "./context";
import { PhoneOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";

const SettingsPage: React.FC = () => {
  return (
    <div style={{width:"650px"}}>
      <PasswordProvider children={<ChangePasswordForm />} />
      <ChangeLanguage />
      <Card
        style={{ display: "flex", flexDirection: "column", margin: "20px" }}
      >
        <div style={{display:"flex", justifyContent:"space-around"}}>
        <div style={{display: "flex"}}>
        <PhoneOutlined style={{fontSize:"25px", marginRight:"10px"}}/> <p>+355 69 789 9306</p>
        </div>
        <div style={{display: "flex", alignItems:"center"}}>
        <MdOutlineEmail style={{fontSize:"25px", marginRight:"10px"}}/> <p>hr@codevider.com</p>
        </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
