import { Avatar, List, Typography } from "antd";
import { t } from "i18next";
import { stringToHashCodeHelper } from "../../../../utils/utils";

export default function EmployeeList({ selectedEvent }: { selectedEvent: any }) {
	const joinedEmployees = selectedEvent.eventParticipants;

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
				renderItem={(item: { fullName: string; _id: string }) => (
					<List.Item>
						<List.Item.Meta
							title={item.fullName}
							avatar={
								<Avatar
									style={{
										backgroundColor: stringToHashCodeHelper(item.fullName),
										color: "black",
										fontSize: "1.2rem",
										fontFamily: "Roboto",
									}}
									alt={item.fullName}
								>
									{item.fullName[0]}
								</Avatar>
							}
						/>
					</List.Item>
				)}
			/>
		</section>
	);
}
