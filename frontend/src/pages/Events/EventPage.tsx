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
import { useTranslation } from "react-i18next";
import { getFromLocalStorage } from "../../utils/utils";

const EVENT_API = import.meta.env.REACT_APP_EVENTS_API;

const EventPage: React.FC = () => {
	const user = getFromLocalStorage("userData");
	console.log(user);
	const { t } = useTranslation();
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
			useHttp.postRequestHelper(EVENT_API, newEvent),

			(responseData: EvenType) => {
				setLoadedEvents((prevEvents) => {
					console.log("prevEvents", responseData);
					return [...prevEvents, responseData];
				});
				handleCloseModal();
			},
		);
	}

	useEffect(() => {
		sendRequest(
			{
				url: EVENT_API,
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
				title={t("addEvent")}
				isOpen={isModalOpen}
				onCancel={handleCloseModal}
				onOk={() => {
					formRef.current.submit();
				}}
				// width={500}
			>
				<AddEventForm ref={formRef} onAdd={handleAddEvent} />
			</Modal>
			<TableHeader
				title={t("eventTitle")}
				onClick={handleOpenModal}
				hideButton={user.role !== "hr"}
			/>
			{error ? (
				<NoDataResult isError />
			) : (
				<>
					<EventMenu
						title={t("thisMonth")}
						EventList={sortByDate(thsMonth)}
						displayNoResult
						onOpenModal={handleOpenModal}
					/>
					<EventMenu
						title={t("upcoming")}
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
