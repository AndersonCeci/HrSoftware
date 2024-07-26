import EventCard from "./EventCard";
import { EvenType } from "../types/EventTypes";
import { Typography } from "antd";

type EventMenuProps = {
	EventList?: EvenType[];
	title: string;
};

const EventMenu = ({ EventList = [], title }: EventMenuProps) => {
	return (
		<section className="event-menu-container">
			<Typography.Title  type="secondary" level={4}>{title}</Typography.Title>
			<ul id="events">
				{EventList.map((event) => (
					<li key={event._id}>
						<EventCard event={event} />
					</li>
				))}
			</ul>
		</section>
	);
};

export default EventMenu;
