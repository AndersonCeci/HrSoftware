import { Typography } from "antd";

type EventListItemProps = {
	title?: string;
	children: React.ReactNode;
	level?: 1 | 2 | 3 | 4 | 5;
};

export default function EventListItem({ title, children, level = 1 }: EventListItemProps) {
	return (
		<li>
			<Typography.Title
				level={level}
				style={{
					marginBottom: 10,
					marginTop: 0,
				}}
			>
				{title}
			</Typography.Title>
			<Typography.Text>{children}</Typography.Text>
		</li>
	);
}
