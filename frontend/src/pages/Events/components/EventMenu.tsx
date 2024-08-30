import EventCard from "./EventCard";
import ShowSelectedEvent from "./SelectedEvent/ShowSelectedEvent";
import Modal from "../../../components/Shared/Modal";
import NoDataResult from "./NoDataResult";
import { EvenType } from "../types/EventTypes";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import useHttp from "../../../hooks/useHttp";
import { getFromLocalStorage } from "../../../utils/utils";

type EventMenuProps = {
	EventList?: EvenType[];
	title: string;
	onOpenModal: () => void;
	displayNoResult?: boolean;
};

const EventMenu = ({ EventList = [], title, displayNoResult = false }: EventMenuProps) => {
	const isOnlyOneEvent = EventList.length === 1;
	const [selectedEvent, setSelectedEvent] = useState<EvenType | undefined>(undefined);
	const [isLoading, error, sendRequest] = useHttp();
	const user = getFromLocalStorage("userData");
	const [isParticipant, setIsParticipant] = useState(false);

	function handleModalShow(event: EvenType | undefined) {
		setSelectedEvent(event);
	}

	function handleJoinEvent() {}

	useEffect(() => {
		if (selectedEvent) {
		}
	}, [selectedEvent]);

	return EventList.length === 0 ? (
		displayNoResult && <NoDataResult />
	) : (
		<section className="event-menu-container">
			<Modal
				title={"Event Details"}
				isOpen={!!selectedEvent}
				onCancel={() => handleModalShow(undefined)}
				onOk={isParticipant ? () => handleJoinEvent() : undefined}
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
