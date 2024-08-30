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
	onUserJoinEvent: (eventId: string) => void;
};

const API = import.meta.env.REACT_APP_EVENTS_API;
const user = getFromLocalStorage("userData");

const EventMenu = ({
	EventList = [],
	title,
	displayNoResult = false,
	onUserJoinEvent,
}: EventMenuProps) => {
	const isOnlyOneEvent = EventList.length === 1;
	const [selectedEvent, setSelectedEvent] = useState<EvenType | undefined>(undefined);
	const [isLoading, , sendRequest] = useHttp();
	const [isJoined, setIsJoined] = useState(false);

	function handleModalShow(event: EvenType | undefined) {
		setSelectedEvent(event);
	}

	useEffect(() => {
		if (selectedEvent) {
			const isJoined = selectedEvent.eventParticipants.includes(user.employID);
			setIsJoined(isJoined);
			setSelectedEvent(selectedEvent);
		}
	}, [selectedEvent]);

	// function handleJoinEvent() {

	return EventList.length === 0 ? (
		displayNoResult && <NoDataResult />
	) : (
		<section className="event-menu-container">
			<Modal
				title={"Event Details"}
				isOpen={!!selectedEvent}
				onCancel={() => handleModalShow(undefined)}
				onOk={!isJoined ? () => onUserJoinEvent(selectedEvent!._id) : undefined}
				okBtnText="Joni"
				isLoading={isLoading}
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
