import { Marker, Autocomplete, useJsApiLoader, Libraries } from "@react-google-maps/api";
import { Flex, Form, Input } from "antd";
import Map from "./Map";
import { UseMapReturnType } from "../../hook/useMap";
import { t } from "i18next";
import { useEffect } from "react";

const libraries: Libraries = ["places", "geocoding"];
const API = import.meta.env.REACT_APP_GOOGLE_MAPS_API;

const mapOptions: google.maps.MapOptions = {
	zoomControl: false,
	streetViewControl: false,
	fullscreenControl: false,
	mapTypeControl: false,
	disableDoubleClickZoom: true,
};

export default function MapInput({ map }: { map: UseMapReturnType }) {
	const form = Form.useFormInstance();

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: API,
		libraries: libraries,
	});

	const combineNameAndAddress =
		(map.locationData.name ? map.locationData.name : "") +
		(map.locationData.address ? " " : "") +
		map.locationData.address;

	useEffect(() => {
		form.setFieldsValue({ location: combineNameAndAddress });
	}, [combineNameAndAddress]);

	return (
		<Flex
			vertical
			style={{
				marginBottom: 20,
				width: "100%",
				height: 400,
			}}
		>
			{isLoaded && (
				<Autocomplete
					onLoad={(autocomplete) => map.setAutocomplete(autocomplete)}
					onPlaceChanged={map.handleAutocompleteSelect}
				>
					<Form.Item
						rules={[
							{
								required: true,
								message: t("errorMessagesLocation"),
							},
						]}
						name={"location"}
						label={t("location")}
					>
						<Input
							placeholder={t("enterLocation")}
							value={combineNameAndAddress}
							onChange={(e) => map.handleMapInputChages(e.target.value)}
							size="large"
						/>
					</Form.Item>
				</Autocomplete>
			)}

			<Map
				onLoad={map.setMap}
				mapOptions={mapOptions}
				onDblClick={map.handleDargAndDblClickEvents}
				onClick={map.handleIconClick}
				isLoaded={isLoaded}
			>
				{map.locationData.location && (
					<Marker
						position={{
							lat: map.locationData.location.lat,
							lng: map.locationData.location.lng,
						}}
						onDragEnd={map.handleDargAndDblClickEvents}
						draggable
					/>
				)}
			</Map>
		</Flex>
	);
}
