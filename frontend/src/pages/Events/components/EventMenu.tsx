import EventCard from "./EventCard";
import ShowSelectedEvent from "./ShowSelectedEvent";
import Modal from "../../../components/Shared/Modal";
import NoDataResult from "./NoDataResult";
import { EvenType } from "../types/EventTypes";
import { Typography } from "antd";
import { useState } from "react";

type EventMenuProps = {
	EventList?: EvenType[];
	title: string;
	onOpenModal: () => void;
	displayNoResult?: boolean;
};

const EventMenu = ({
	EventList = [],
	title,
	onOpenModal,
	displayNoResult = false,
}: EventMenuProps) => {
	const isOnlyOneEvent = EventList.length === 1;
	const [selectedEvent, setSelectedEvent] = useState<EvenType | undefined>(undefined);

	function handleModalShow(event: EvenType | undefined) {
		setSelectedEvent(event);
	}

	return EventList.length === 0 ? (
		displayNoResult && <NoDataResult onOpenModal={onOpenModal} />
	) : (
		<section className="event-menu-container">
			<Modal
				title={"Event Details"}
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
