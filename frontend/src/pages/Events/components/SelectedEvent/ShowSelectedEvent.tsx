import "../../styles/ShowSlectedEvent.css";
import { EvenType } from "../../types/EventTypes";
import { Flex, Typography } from "antd";

import EventListItem from "./EventListItem";
import SelectedEventInformation from "./SelectedEventInformation";

import { PhotosAndMapCard } from "./PhotosAndMapCard";
import { isHR } from "../../../../utils/utils";
import EmployeeList from "./EmployeeList";

type ShowSelectedEventProps = {
	selectedEvent: EvenType;
};

const isHr = isHR();

const ShowSelectedEvent = ({ selectedEvent }: ShowSelectedEventProps) => {
	return (
		<section className="show-event-container">
			<Typography.Title className="event-name-text">{selectedEvent.eventName}</Typography.Title>

			<PhotosAndMapCard selectedEvent={selectedEvent} />

			<Flex vertical gap={10}>
				<EventListItem>
					{selectedEvent.location.name && (
						<Typography.Paragraph>
							<strong>Name:</strong> {selectedEvent.location.name}
						</Typography.Paragraph>
					)}
					<Typography.Paragraph>
						<strong>Address:</strong> {selectedEvent.location.address}
					</Typography.Paragraph>
				</EventListItem>
				<SelectedEventInformation selectedEvent={selectedEvent} />
			</Flex>

			{isHr && <EmployeeList />}
		</section>
	);
};

export default ShowSelectedEvent;
