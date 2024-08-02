// import { Form, Input, Button, Card, message } from "antd";
// import axios, { AxiosError } from "axios";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "antd/es/form/Form";

// const ChangePasswordForm = () => {
//   const [form] = useForm();
//   const navigate = useNavigate();

//   const onChangePassword = async (values: any) => {
//     const passwords = {
//       oldPassword: values.oldPassword,
//       newPassword: values.newPassword,
//     };
//     const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//     const token = userData.token;

//     if (!token) {
//       message.error("No token found. Please login again.");
//       localStorage.removeItem("userData");
//       navigate("/login");
//       return;
//     }
//     const config = {
//       headers: { Authorization: `Bearer ${token}` },
//     };

//     try {
//       await axios.put(
//         `http://localhost:3000/users/change-password`,
//         passwords,
//         config
//       );
//       message.success("Password changed successfully!");
//       form.resetFields();
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         console.log(error);
//         message.error(
//           "Failed to change password: " +
//             (error.response?.data.errorDetails.message || error.message)
//         );
//       }
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <Card title="Change Password" style={{ width: 400 }}>
//         <Form
//           form={form}
//           id="change-password-form"
//           onFinish={onChangePassword}
//           layout="vertical"
//         >
//           <Form.Item
//             label="Old Password"
//             name="oldPassword"
//             rules={[
//               { required: true, message: "Please input your old password!" },
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <Form.Item
//             label="New Password"
//             name="newPassword"
//             rules={[
//               { required: true, message: "Please input your new password!" },
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <Form.Item
//             label="Confirm Password"
//             name="confirmPassword"
//             dependencies={["newPassword"]}
//             rules={[
//               { required: true, message: "Please confirm your new password!" },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue("newPassword") === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(
//                     new Error("The two passwords do not match!")
//                   );
//                 },
//               }),
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
//               Change Password
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default ChangePasswordForm;
import { Form, Input, Button, Card } from 'antd';
import { usePassword } from '../context';
import { usePasswordValidation } from '../context/hook';
import { useTranslation } from 'react-i18next';


const ChangePasswordForm = () => {
  const [form] = Form.useForm();
  const { changePassword } = usePassword();
  const { validateConfirmPassword, validateNewPasswordNotOldPassword } = usePasswordValidation(form);

  const onChangePassword = async (values: any) => {
    const { oldPassword, newPassword } = values;

    try {
      await changePassword(oldPassword, newPassword);
      form.resetFields();
    } catch (error) {
     console.log(error);
    }
  };

  const {t} = useTranslation()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: '100vh',
      }}
    >
      <Card title={t(`changePassoword`)} style={{ width: 400 }}>
        <Form
          form={form}
          id="change-password-form"
          onFinish={onChangePassword}
          layout="vertical"
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                validator: validateNewPasswordNotOldPassword,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              {
                validator: validateConfirmPassword,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {t(`changePassoword`)}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePasswordForm;
