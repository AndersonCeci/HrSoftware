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
	const { eventName, eventDate, eventStartTime, eventEndTime, images } = event;

	const date = new Date(eventDate);
	const month = date.toLocaleString("default", { month: "short" });
	const day = date.getDate();
	const isMultipleDays = event.eventEndDate === event.eventDate;

	const displayedTime = !isMultipleDays ? eventStartTime : `${eventStartTime} - ${eventEndTime}`;

	return (
		<div className={`event-item ${isAlone ? "alone-event" : ""}`}>
			<article>
				<Carousel pauseOnHover adaptiveHeight draggable className="carousel-events">
					{images?.map((image, index) => (
						<div key={index} className="event-image-container">
							<img className="event-image" src={image} alt={`Event Picture`} />
						</div>
					))}
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
						<h5 className="event-date-time">{displayedTime}</h5>
						<h2 className="event-name">{eventName}</h2>
					</Flex>
				</Flex>
			</article>
		</div>
	);
};

export default EventCard;
