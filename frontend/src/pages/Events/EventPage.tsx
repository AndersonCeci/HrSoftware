import EventMenu from "./components/EventMenu";
import Loader from "../../components/Shared/Loader";
import Modal from "../../components/Shared/Modal";
import NoDataResult from "./components/NoDataResult";
import TableHeader from "../../components/Table/TableHeader";
import "./styles/EventPage.css";
import { EvenType } from "./types/EventTypes";
import { sortByDate, devideEventsByMonth } from "./utils/utils";
import useHttp from "../../hooks/useHttp";
import { useState, useEffect, useRef } from "react";
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
		sendRequest(
			{
				url: import.meta.env.REACT_APP_EVENTS_API,
				headers: {
					"Content-Type": "application/json",
				},
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

	useEffect(() => {
		sendRequest(
			{
				url: import.meta.env.REACT_APP_EVENTS_API,
			},
			(responseData: EvenType[]) => {
				setLoadedEvents(responseData);
			},
		);
	}, []);

	const { thsMonth, nextMonth } = devideEventsByMonth(loadedEvents);

	return !isLoading ? (
		<main>
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
			<TableHeader title="Events" onClick={handleOpenModal} />
			{error ? (
				<NoDataResult onOpenModal={handleOpenModal} isError />
			) : (
				<>
					<EventMenu
						title={"This Month"}
						EventList={sortByDate(thsMonth)}
						displayNoResult
						onOpenModal={handleOpenModal}
					/>
					<EventMenu
						title={"Near Future"}
						EventList={sortByDate(nextMonth)}
						onOpenModal={handleOpenModal}
					/>
				</>
			)}
		</main>
	) : (
		<Loader />
	);
};

export default EventPage;
