import { Avatar, List, Typography } from "antd";
import { t } from "i18next";
import { stringToHashCodeHelper } from "../../../../utils/utils";
import { EventParticipantsType } from "../../types/EventTypes";

export default function EmployeeList({ participants }: { participants: EventParticipantsType[] }) {
	function renderAvatar(profilePhoto: string | undefined, fullName: string) {
		if (profilePhoto) {
			return <Avatar src={profilePhoto} alt={fullName} />;
		}
		return (
			<Avatar
				style={{
					backgroundColor: stringToHashCodeHelper(fullName),
					color: "black",
					fontSize: "1.2rem",
					fontFamily: "Roboto",
				}}
				alt={fullName}
			>
				{fullName[0]}
			</Avatar>
		);
	}

	return (
		<section className="employee-list-container">
			<List
				header={
					<Typography.Title level={4}>
						<strong>{t("joinedEmployees")}:</strong> {participants.length}
					</Typography.Title>
				}
				size="small"
				itemLayout="horizontal"
				dataSource={participants}
				renderItem={(item: { fullName: string; _id: string; profilePhoto: string | undefined }) => (
					<List.Item>
						<List.Item.Meta
							title={item.fullName}
							avatar={renderAvatar(item.profilePhoto, item.fullName)}
						/>
					</List.Item>
				)}
			/>
		</section>
	);
}
