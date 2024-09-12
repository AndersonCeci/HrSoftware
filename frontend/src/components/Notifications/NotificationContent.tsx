import React, { useEffect, useState } from "react";
import { Avatar, Button, List } from "antd";
import VirtualList from "rc-virtual-list";
import "../Notifications/NotificationStyle.css";
import useHttp from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";

interface NotificationItem {
	_id: string;
	message: string;
	createdAt: string;
	isRead: boolean;
	path: string;
}

const API = import.meta.env.REACT_APP_NOTIFICATIONS_API;

const ContainerHeight = 400;

const NotificationContent: React.FC = () => {
	const employID = JSON.parse(localStorage.getItem("userData") || "{}").employID;

	console.log(employID, "employId");
	const [data, setData] = useState<NotificationItem[]>([]);
	const [, , fetchData] = useHttp();
	const navigate = useNavigate();

	const appendData = () => {
		fetch(`${API}/?userId=${employID}`)
			.then((res) => res.json())
			.then((body) => {
				console.log(body, employID, "bodyyNotificationss");
				setData(body);
				data.length;
				console.log(data.length, "lengthhhhh");
				// message.success(`${body.results.length} more items loaded!`);
			});
	};

	useEffect(() => {
		appendData();
	}, [employID]);

	const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
		appendData();
	};

	const changeNotificationStatus = (notificationId: string) => {
		fetchData(
			{
				url: `${API}/${notificationId}/read`,
				method: "PATCH",
			},
			() => {
				setData((prev) =>
					prev.map((item) => {
						if (item._id === notificationId) {
							return { ...item };
						}
						return item;
					}),
				);
			},
		);
	};

	useEffect(() => {
		fetchData({ url: API }, (data) => {
			setData(data);
		});
	}, []);

	return (
		<List className="ant-list">
			<VirtualList
				data={data}
				height={ContainerHeight}
				itemHeight={47}
				itemKey="email"
				onScroll={onScroll}
			>
				{(item: NotificationItem) => (
					<List.Item className={item.isRead ? "notification-is-read" : ""} key={item._id}>
						<List.Item.Meta
							// avatar={<Avatar />}
							title={<a onClick={() => navigate(item.path)}>{item.message}</a>}
							description={item.createdAt}
						/>
						<Button
							style={{ color: item.isRead ? "purple" : "blue" }}
							className="markAsRead"
							type="text"
							onClick={() => changeNotificationStatus(item._id)}
						>
							{" "}
							{item.isRead ? "Read" : "Mark as Read"}
						</Button>
					</List.Item>
				)}
			</VirtualList>
		</List>
	);
};

export default NotificationContent;
