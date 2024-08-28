import "../styles/ShowSlectedEvent.css";
import { EvenType } from "../types/EventTypes";
import { Carousel, Flex, Typography } from "antd";
import { useState } from "react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";

import { Marker } from "@react-google-maps/api";

import EventListItem from "./EventListItem";
import SelectedEventInformation from "./SelectedEventInformation";
import Button from "../../../components/Shared/Button";
import Map from "./Map/Map";

import { FaMapMarkedAlt } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";

type ShowSelectedEventProps = {
	selectedEvent: EvenType;
};

const libraries: Libraries = ["places", "geocoding"];
const API = import.meta.env.REACT_APP_GOOGLE_MAPS_API;

const mapOptions: google.maps.MapOptions = {
	zoomControl: false,
	streetViewControl: false,
	fullscreenControl: false,
	mapTypeControl: false,
	clickableIcons: false,
};

const ShowSelectedEvent = ({ selectedEvent }: ShowSelectedEventProps) => {
	const [showMap, setShowMap] = useState(false);

	function handleShowImage() {
		setShowMap((prev) => !prev);
	}

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: API,
		libraries: libraries,
	});

	console.log("Location data", selectedEvent.location.position);

	return (
		<section className="show-event-container">
			<Typography.Title className="event-name-text">{selectedEvent.eventName}</Typography.Title>
			<div className="carousel-map-container">
				<Button
					onClick={handleShowImage}
					type="default"
					icon={
						!showMap ? (
							<FaMapMarkedAlt className="map-carousel-container-icon" />
						) : (
							<FaRegImage className="map-carousel-container-icon" />
						)
					}
					className="map-carousel-btn"
					size="large"
					shape="circle"
				/>

				{!showMap ? (
					<Carousel pauseOnHover adaptiveHeight draggable>
						{selectedEvent.images?.map((image, index) => (
							<div key={index} className="selected-event-image-container">
								<img src={image} alt={`Event ${index}`} className="selected-event-image" />
							</div>
						))}
					</Carousel>
				) : (
					<Map
						onLoad={(map) => {
							map.setCenter({
								lat: selectedEvent.location.position!.lat,
								lng: selectedEvent.location.position!.lng,
							});
							//Add marker
							new google.maps.Marker({
								position: {
									lat: selectedEvent.location.position!.lat,
									lng: selectedEvent.location.position!.lng,
								},
								map: map,
							});
						}}
						mapOptions={mapOptions}
						isLoaded={isLoaded}
					>
						{/* {selectedEvent.location.position?.lat && selectedEvent.location.position.lng && (
							<Marker
								position={{
									lat: selectedEvent.location.position.lat,
									lng: selectedEvent.location.position.lng,
								}}
							/>
						)} */}
					</Map>
				)}
			</div>
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
		</section>
	);
};

export default ShowSelectedEvent;
