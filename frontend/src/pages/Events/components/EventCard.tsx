import "../styles/EventCard.css";
import TempImage from "../../../assets/image 99.png";
import ICONTEMP from "../../../assets/Group 14.svg";
import { Carousel, Flex } from "antd";
import { EvenType } from "../types/EventTypes";

type EventCardProps = {
	event: EvenType;
};

const EventCard = ({ event }: EventCardProps) => {
	const { eventName, eventDate, eventStartTime, eventEndTime } = event;
	// const dayOfMonth = eventDate.split("/")[0];
	// const month = eventDate.split("/")[1];
	// const givenMonthName = new Date().toLocaleString("default", { month: "long" });
	const [day, month, year] = eventDate.split("/");

	// Create a new Date object using the extracted values
	const date = new Date(parseInt(day), parseInt(month) - 1); // Month is 0-indexed in JavaScript Date object

	// Get the three-letter abbreviation of the month
	const monthAbbreviation = date.toLocaleString("default", { month: "short" });

	return (
		<div className="event-item">
			<article>
				<Carousel pauseOnHover autoplay autoplaySpeed={10000} adaptiveHeight draggable>
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
						<h4 className="event-date-month">{monthAbbreviation}</h4>
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
