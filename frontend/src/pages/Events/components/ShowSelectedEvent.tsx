import { EvenType } from "../types/EventTypes";
import { Carousel, Flex, Typography } from "antd";
import TempImage from "../../../assets/image 99.png";
import "../styles/ShowSlectedEvent.css";

type ShowSelectedEventProps = {
	selectedEvent: EvenType;
};

const ShowSelectedEvent = ({ selectedEvent }: ShowSelectedEventProps) => {
	const date = new Date(selectedEvent.eventDate);
	const dateStr = date.toLocaleDateString("en-US");
	console.log(dateStr);

	return (
		<section className="show-event-container">
			<Typography.Title>{selectedEvent.eventName}</Typography.Title>
			<Carousel draggable className="large-image">
				<img className="temp-img-class" src={TempImage} alt="no" />
				<img className="temp-img-class" src={TempImage} alt="no" />
				<img className="temp-img-class" src={TempImage} alt="no" />
				<img className="temp-img-class" src={TempImage} alt="no" />
			</Carousel>
			<Flex justify="space-between">
				<div>
					<p>
						{selectedEvent.eventDescription
							? selectedEvent.eventDescription
							: "No description available"}
					</p>
				</div>
				<div>
					<h4>{dateStr}</h4>
					<h4>{selectedEvent.eventStartTime}</h4>
					<h4>{selectedEvent.eventEndTime}</h4>
				</div>
			</Flex>
		</section>
	);
};

export default ShowSelectedEvent;
