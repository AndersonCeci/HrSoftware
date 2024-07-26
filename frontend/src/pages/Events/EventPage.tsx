import EventMenu from "./components/EventMenu";
import Loader from "../../components/Shared/Loader";
import NoDataResult from "./components/NoDataResult";
import Modal from "../../components/Shared/Modal";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import "./styles/EventPage.css";

import { EvenType } from "./types/EventTypes";

import useHttp from "../../hooks/useHttp";
import { useState, useEffect, useRef } from "react";
import { Flex } from "antd";
import Button from "../../components/Shared/Button";
import { ButtonSize, ButtonType } from "../../enums/Button";
import AddEventForm from "./components/AddEventForm";

const EventPage: React.FC = () => {
	const [isLoading, error, sendRequest] = useHttp();
	const [loadedEvents, setLoadedEvents] = useState<EvenType[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const formRef = useRef<any>();

	function handleOpenModal() {
		setIsModalOpen(true);
	}

	function handleCloseModal() {
		setIsModalOpen(false);
	}

	function handleAddEvent(newEvent: EvenType) {
		console.log("Add Event", newEvent);

		sendRequest(
			{
				url: "http://localhost:3000/event",
				method: "POST",
				body: newEvent,
			},
			(responseData: EvenType) => {
				setLoadedEvents((prevEvents) => {
					return [...prevEvents, responseData];
				});
				handleCloseModal();
			},
		);
	}

	// const today = new Date();
	// const [month, date, year] = today.toLocaleDateString("en-US").split("/");
	// console.log(date, month, year);
	// console.log(today);
	// const firstEventDate = loadedEvents.length > 0 ? loadedEvents[0].eventDate.split("/") : "";
	// const [firstEventMonth, firstEventDay, firstEventYear] = firstEventDate;
	// console.log(firstEventDay, firstEventMonth, firstEventYear);

	useEffect(() => {
		sendRequest(
			{
				url: "http://localhost:3000/event",
			},
			(responseData: EvenType[]) => {
				setLoadedEvents(responseData);
			},
		);
	}, []);

	return !isLoading ? (
		<main className="event-page-main">
			<Modal
				title="Add Event"
				isOpen={isModalOpen}
				onCancel={handleCloseModal}
				onOk={() => {
					formRef.current.submit();
				}}
			>
				<AddEventForm ref={formRef} onAdd={handleAddEvent} />
			</Modal>
			<Flex justify="space-between" align="center">
				<Typography.Title>Events</Typography.Title>
				<Button
					icon={<PlusCircleOutlined />}
					size={ButtonSize.LARGE}
					type={ButtonType.PRIMARY}
					onClick={handleOpenModal}
				>
					Add Event
				</Button>
			</Flex>
			{loadedEvents.length <= 0 ? (
				<NoDataResult onOpenModal={handleOpenModal} />
			) : (
				<EventMenu title={"This Month"} EventList={loadedEvents} />
			)}
			{loadedEvents.length > 0 && <EventMenu title={"Near Future"} EventList={loadedEvents} />}
		</main>
	) : (
		<Loader />
	);
};

export default EventPage;
