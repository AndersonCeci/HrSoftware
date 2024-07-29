import EventCard from "./EventCard";
import ShowSelectedEvent from "./ShowSelectedEvent";
import Modal from "../../../components/Shared/Modal";
import { EvenType } from "../types/EventTypes";
import { Typography } from "antd";
import { useState } from "react";

type EventMenuProps = {
	EventList?: EvenType[];
	title: string;
};

const EventMenu = ({ EventList = [], title }: EventMenuProps) => {
	const isOnlyOneEvent = EventList.length === 1;
	const [selectedEvent, setSelectedEvent] = useState<EvenType | undefined>(undefined);

	function handleModalShow(event: EvenType | undefined) {
		setSelectedEvent(event);
	}

	return (
		<section className="event-menu-container">
			<Modal
				title={selectedEvent?.eventName}
				isOpen={!!selectedEvent}
				onCancel={() => handleModalShow(undefined)}
			>
				{selectedEvent && <ShowSelectedEvent selectedEvent={selectedEvent} />}
			</Modal>

			<Typography.Title type="secondary" level={4}>
				{title}
			</Typography.Title>
			<ul id="events">
				{EventList.map((event) => (
					<li key={event._id} onClick={() => handleModalShow(event)}>
						<EventCard event={event} isAlone={isOnlyOneEvent} />
					</li>
				))}
			</ul>
		</section>
	);
};

export default EventMenu;
