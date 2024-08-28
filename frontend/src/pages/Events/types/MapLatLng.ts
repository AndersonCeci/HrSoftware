export type MapLatLng = {
	lat: number;
	lng: number;
};

export type SelectedLocationData = {
	location: MapLatLng | null;
	address: string;
	name: string | undefined;
};
