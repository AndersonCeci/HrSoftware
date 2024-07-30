import "../styles/EventCard.css";
import TempImage from "../../../assets/image 99.png";
import ICONTEMP from "../../../assets/Group 14.svg";
import { Carousel, Flex } from "antd";
import { EvenType } from "../types/EventTypes";

type EventCardProps = {
	event: EvenType;
	isAlone?: boolean;
};

const EventCard = ({ event, isAlone }: EventCardProps) => {
	const { eventName, eventDate, eventStartTime, eventEndTime } = event;

	const date = new Date(eventDate);
	const month = date.toLocaleString("default", { month: "short" });
	const day = date.getDate();

	return (
		<div className={`event-item ${isAlone ? "alone-event" : undefined}`}>
			<article>
				<Carousel pauseOnHover adaptiveHeight draggable>
					<div className="event-image-container">
						<img src={TempImage} alt="Event" />
					</div>
					<div className="event-image-container">
						<img src={ICONTEMP} alt="Event" />
					</div>
					<div className="event-image-container">
						<img src={TempImage} alt="Event" />
					</div>
					<div className="event-image-container">
						<img src={ICONTEMP} alt="Event" />
					</div>
				</Carousel>

				<Flex className="event-info-container" gap={35} justify="center">
					<Flex vertical gap={4}>
						<h4 className="event-date-month">{month}</h4>
						<h2 className="event-date-day">{day}</h2>
					</Flex>
					<Flex
						vertical
						gap={7}
						align="start"
						justify="flex-start"
						className="event-time-name-container"
					>
						<h5 className="event-date-time">{`${eventStartTime} - ${eventEndTime}`}</h5>
						<h2 className="event-name">{eventName}</h2>
					</Flex>
				</Flex>
			</article>
		</div>
	);
};

export default EventCard;
