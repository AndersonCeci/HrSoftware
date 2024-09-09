import { Avatar, List, Typography } from "antd";
import { t } from "i18next";

function hashmapValueToColor(value: string) {
	const allChars = value.split("");

	let sum = 0;
	for (let i in allChars) {
		sum += allChars[i].charCodeAt(0) ^ 255;
	}

	const scaledSum = Math.abs(sum) % 0xffffff;
	return convertNumToColorHex(scaledSum);
}

function convertNumToColorHex(num: number) {
	const hex = num.toString(16).padStart(3, "0");
	console.log("hex", hex);
	const reversedHex = hex.split("").reverse().join("");

	console.log(`#${hex}${reversedHex}`);
	return `#${reversedHex}${hex}`;
}

export default function EmployeeList({ selectedEvent }: { selectedEvent: any }) {
	const joinedEmployees = selectedEvent.eventParticipants.map(
		(employee: { fullName: string; _id: string }) => employee.fullName,
	);

	console.log("selectedEvent", joinedEmployees);

	return (
		<section className="employee-list-container">
			<List
				header={
					<Typography.Title level={4}>
						<strong>{t("joinedEmployees")}:</strong> {joinedEmployees.length}
					</Typography.Title>
				}
				size="small"
				itemLayout="horizontal"
				dataSource={joinedEmployees}
				renderItem={(item: string) => (
					<List.Item>
						<List.Item.Meta
							title={item}
							avatar={
								<Avatar
									style={{
										backgroundColor: hashmapValueToColor(item),
										color: "white",
									}}
									alt={item}
								>
									{item[0]}
								</Avatar>
							}
						/>
					</List.Item>
				)}
			/>
		</section>
	);
}
