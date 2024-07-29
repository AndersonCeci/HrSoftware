import { Form, Button } from "antd";
import FormInputs from "../components/Shared/InputTypes/FormInputs";

const OrganisationalStructurePage: React.FC = () => {
	const [form] = Form.useForm();

	function onFinish(values: any) {
		const { name, phoneNumber, personalNumber, password, email, dob } = values;

		const valuesToSend = {
			name,
			phoneNumber,
			personalNumber,
			password,
			email,
			tob: dob.format("HH:mm"),
			birthCity: values.birthCity,
			dob: dob.format("DD/MM/YYYY"),
		};

		console.log("valuesToSend", valuesToSend);
	}

	const options = [
		{ value: "Afghanistan" },
		{ value: "Albania" },
		{ value: "Algeria" },
		{ value: "Andorra" },
		{ value: "Angola" },
	];

	const gender = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
	];

	return (
		<Form onFinish={onFinish} layout="vertical" autoComplete="off" form={form} name="basic">
			<FormInputs.Input label="Name" name="name" required />
			<FormInputs.Input
				label="Phone Number"
				name="phoneNumber"
				required
				defaultValidateRule="phoneNumber"
			/>
			<FormInputs.Input
				label="Personal Number"
				name="personalNumber"
				required
				defaultValidateRule="personalNumber"
			/>
			<FormInputs.Input
				label="Password"
				name="password"
				required
				type="password"
				defaultValidateRule="password"
			/>
			<FormInputs.Input label="Email" name="email" required defaultValidateRule="email" />
			<FormInputs.DatePicker label="Date of Birth" name="dob" required isDisabledDate />
			<FormInputs.Input label="My Life" name="mylife" type="textarea" />
			<FormInputs.TimePicker label="Time of Birth" name="tob" />
			<FormInputs.AutoComplete
				label="Birth City"
				name="birthCity"
				options={options}
				isMatchWithOption
			/>
			<FormInputs.Select label="Gender" name="gender" options={gender} required/>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default OrganisationalStructurePage;
