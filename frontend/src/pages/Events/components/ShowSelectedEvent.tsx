import { EvenType } from "../types/EventTypes";
import { Carousel, Flex, Typography } from "antd";
import TempImage from "../../../assets/image 99.png";
import "../styles/ShowSlectedEvent.css";
import { useState } from "react";

type ShowSelectedEventProps = {
	selectedEvent: EvenType;
};

const ShowSelectedEvent = ({ selectedEvent }: ShowSelectedEventProps) => {
	const [expanded, setExpanded] = useState(false);
	const date = new Date(selectedEvent.eventDate);
	const dateEnd = new Date(selectedEvent.eventEndDate || selectedEvent.eventDate);
	const dateStr = date.toLocaleDateString("en-GB");
	const dateEndStr = dateEnd.toLocaleDateString("en-GB");

	const isOnlyOneDay = dateStr === dateEndStr;

	const displayedDate = dateStr + (isOnlyOneDay ? "" : ` - ${dateEndStr}`);
	const displayedTime =
		selectedEvent.eventStartTime + (!isOnlyOneDay ? "" : ` - ${selectedEvent.eventEndTime}`);

	console.log(displayedTime);
	return (
		<section className="show-event-container">
			<Typography.Title className="event-name-text">{selectedEvent.eventName}</Typography.Title>
			<Carousel autoplay draggable className="large-image">
				<img className="temp-img-class" src={TempImage} alt="no" />
				<img className="temp-img-class" src={TempImage} alt="no" />
				<img className="temp-img-class" src={TempImage} alt="no" />
				<img className="temp-img-class" src={TempImage} alt="no" />
			</Carousel>
			<Flex justify="space-between" align="flex-start" gap={50}>
				{selectedEvent.eventDescription && (
					<div className="selected-event-description-container">
						<Typography.Paragraph
							ellipsis={{
								rows: 5,
								expandable: "collapsible",
								expanded: expanded,
								symbol: expanded ? "Show less" : "Show more",
								onExpand: (_, info) => setExpanded(info.expanded),
							}}
						>
							{selectedEvent.eventDescription}
						</Typography.Paragraph>
					</div>
				)}
				<div className="selected-event-list-container">
					<ul className="selected-event-list">
						<li>
							<Typography.Title level={4}>Date </Typography.Title>
							<Typography.Text className="selected-event-info">{displayedDate}</Typography.Text>
						</li>

						<li>
							<Typography.Title level={4}>Time </Typography.Title>
							<Typography.Text className="selected-event-info">{displayedTime}</Typography.Text>
						</li>
					</ul>
				</div>
			</Flex>
		</section>
	);
};

export default ShowSelectedEvent;
