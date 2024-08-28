import { GoogleMap } from "@react-google-maps/api";
import { Flex, Skeleton } from "antd";
import { MapLatLng } from "../../types/MapLatLng";
import { useState } from "react";

type MapProps = {
	children?: React.ReactNode;
	mapOptions?: google.maps.MapOptions;
	onLoad: (map: google.maps.Map) => void;
	onDblClick?: (event: google.maps.MapMouseEvent) => void;
	onClick?: (event: google.maps.MapMouseEvent) => void;
	isLoaded: boolean;
};

export default function Map({
	children,
	mapOptions,
	onLoad,
	onDblClick,
	onClick,
	isLoaded,
}: MapProps) {
	const [initialCenter, setInitialCenter] = useState<MapLatLng>({
		lat: 41.331672,
		lng: 19.8203257,
	});

	//? useEffect(() => {
	//? 	navigator.geolocation.getCurrentPosition((position) => {
	//? 		setInitialCenter({
	//? 			lat: position.coords.latitude,
	//? 			lng: position.coords.longitude,
	//? 		});
	//? 	});
	//? }, []);

	if (!isLoaded) {
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
			style={{
				height: "100%",
				width: "100%",
				borderRadius: 10,
				overflow: "hidden",
				border: "1px solid #d9d9d9",
			}}
		>
			<GoogleMap
				zoom={15}
				mapContainerStyle={{ height: "100%", width: "100%" }}
				options={mapOptions}
				onLoad={(map) => {
					onLoad(map);
					map.setCenter(new google.maps.LatLng(initialCenter));
				}}
				onDblClick={onDblClick}
				onClick={onClick}
			>
				{children}
			</GoogleMap>
		</Flex>
	);
}
