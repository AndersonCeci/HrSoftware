import { useJsApiLoader, GoogleMap, Marker, Autocomplete, Libraries } from "@react-google-maps/api";
import { Flex, Form, Input, Skeleton } from "antd";
import { useState, useEffect } from "react";

const API = import.meta.env.REACT_APP_GOOGLE_MAPS_API;

const libraries: Libraries = ["places", "geocoding"];

type MapLatLng = {
	lat: number;
	lng: number;
};

export default function MapInput() {
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: API,
		libraries: libraries,
	});

	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [mapCoordinates, setMapCoordinates] = useState<MapLatLng | null>(null);

	const [initialCenter, setInitialCenter] = useState<MapLatLng | null>({
		lat: 41.331672,
		lng: 19.8203257,
	});

	const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
	const [places, setPlaces] = useState<google.maps.places.Place | null>();

	const [userInputText, setUserInputText] = useState<string>("");

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			setInitialCenter({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}, []);

	function handleInputChange(e: any) {
		setUserInputText(e.target.value);
	}

	function handlePlaceInputSelect() {
		const place = autocomplete!.getPlace();

		if (place.geometry) {
			const lat = place.geometry.location!.lat();
			const lng = place.geometry.location!.lng();

			map?.setCenter(new google.maps.LatLng({ lat, lng }));
			setMapCoordinates({ lat, lng });
			setUserInputText(place.name + " " + place.formatted_address!);
			console.log(place.name);
		}
	}

	function handleMarkerLocationChange(e: google.maps.MapMouseEvent) {
		const lat = e.latLng!.lat();
		const lng = e.latLng!.lng();

		new google.maps.Geocoder().geocode(
			{
				location: { lat, lng },
			},
			(results, status) => {
				if (status === google.maps.GeocoderStatus.OK) {
					if (results) {
						const place = results[0].formatted_address;
						setUserInputText(place!);
					}
				}
			},
		);

		setMapCoordinates({ lat, lng });
	}

	if (!isLoaded || !initialCenter) {
		return (
			<Flex
				vertical
				style={{
					width: "100%",
					height: 300,
				}}
			>
				<Skeleton.Input style={{ width: "100%", height: "100%" }} active />
			</Flex>
		);
	}

	return (
		<Flex
			vertical
			gap={20}
			style={{
				marginBottom: 20,
			}}
		>
			<Autocomplete
				onLoad={(autocomplete) => {
					setAutocomplete(autocomplete);
				}}
				onPlaceChanged={handlePlaceInputSelect}
			>
				<Input value={userInputText} onChange={handleInputChange} size="large" />
			</Autocomplete>

			<Flex
				style={{
					height: 300,
					width: "100%",
					borderRadius: 10,
					overflow: "hidden",
					border: "1px solid #d9d9d9",
				}}
			>
				<GoogleMap
					zoom={15}
					mapContainerStyle={{ height: "100%", width: "100%" }}
					options={{
						zoomControl: false,
						mapTypeControl: false,
						streetViewControl: false,
						fullscreenControl: false,
						disableDoubleClickZoom: true,
						// clickableIcons: false,
					}}
					onLoad={(map) => {
						setMap(map);
						map.setCenter(new google.maps.LatLng(initialCenter));
					}}
					onDblClick={handleMarkerLocationChange}
				>
					{mapCoordinates && (
						<Marker
							position={mapCoordinates}
							draggable
							onDrag={handleMarkerLocationChange}
							onDragEnd={() => {
								console.log("Drag End");
								console.log(mapCoordinates, "Map Coordinates");
								console.log(map?.getCenter()?.toString(), "Map");
							}}
						/>
					)}
				</GoogleMap>
			</Flex>
		</Flex>
	);
}
