// import Form from "antd/es/form/Form";
import Steps from "../../../components/Shared/Steps";
import Button from "../../../components/Shared/Button";
import { UserOutlined } from "@ant-design/icons";
import { FaUserCheck } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";

import { BsPencilSquare } from "react-icons/bs";
import FirstPanel from "./FirstPanel";
import SecondStep from "./SecondStep";
import { Space, Flex, Form, Layout } from "antd";
import { ButtonType } from "../../../enums/Button";
import { useState } from "react";
import { EmployeeDataType } from "../types/Employee";

const { Content, Sider, Header } = Layout;

const AddEmployeeForm = () => {
	const [current, setCurrent] = useState(0);
	const [form] = Form.useForm<EmployeeDataType>();

	function handleStepChanges(changer: number) {
		if (changer > 0) {
			form.validateFields().then(() => {
				setCurrent((prev) => prev + changer);
			});
		} else {
			setCurrent((prev) => prev + changer);
		}
	}

	function handleFinish() {
		form.validateFields().then((values) => {
			console.log(values);
		});

		const fullname = `${form.getFieldValue("name")} ${form.getFieldValue("surname")}`;
		const codeviderEmail = form.getFieldValue("email").split("@")[0] + "@codevider.com";
		const dateToStart = form.getFieldValue("starting");



		const vdataToSubmit = {
			name: form.getFieldValue("name"),
			surname: form.getFieldValue("surname"),
			username: fullname,
			email: codeviderEmail,
			phone: form.getFieldValue("phone"),
			position: form.getFieldValue("position"),
			salary: form.getFieldValue("salary"),
			teamLeader: form.getFieldValue("teamLeader"),
			dateToStart: `${dateToStart.$D}/${dateToStart.$M + 1}/${dateToStart.$y}`,
			contract: form.getFieldValue("contract"),
			password: "codevider",
		};

		console.log(vdataToSubmit, "vdataToSubmit");

		handleStepChanges(1);
	}

	function handleInputChange(value: any, identifier: string) {
		console.log(value, identifier);
		form.setFieldsValue({ [identifier]: value });
	}

	const item = [
		{
			subTitle: "Create Account",
			content: <FirstPanel onChange={handleInputChange} form={form} />,
			icon: current === 0 ? <UserOutlined /> : <FaUserCheck />,
		},
		{
			subTitle: "Add Information",
			content: <SecondStep onChange={handleInputChange} form={form} />,
			icon: current === 1 ? <BsPencilSquare /> : <IoDocumentOutline />,
		},
		{
			subTitle: "Finalize Account",
			content: <h1>EVALUATE</h1>,
			icon: current === 2 ? <FaCircleCheck /> : <CiCircleCheck />,
		},
	];

	return (
		<Layout style={{ height: "100%", background: "#fff" }}>
			<Content>
				<Form layout="vertical" form={form} name="basic" initialValues={{ remember: true }}>
					<div>{item[current].content}</div>
					<Space>
						{current > 0 && <Button onClick={() => handleStepChanges(-1)}> Back</Button>}
						<Button
							type={ButtonType.PRIMARY}
							onClick={() => (current === item.length - 2 ? handleFinish() : handleStepChanges(1))}
							block
						>
							{current === item.length - 2 ? "Finish" : "Next"}
						</Button>
					</Space>
				</Form>
			</Content>
			<Sider theme={"light"}>
				<Steps direction="vertical" current={current} responsive items={item} />
			</Sider>
		</Layout>
	);
};

export default AddEmployeeForm;
