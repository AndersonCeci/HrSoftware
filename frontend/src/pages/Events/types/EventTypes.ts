import { SelectedLocationData } from "./MapLatLng";

export type EvenType = {
	_id: string;
	eventName: string;
	eventDescription?: string;
	eventDate: Date;
	eventEndDate?: Date;
	eventStartTime: string;
	eventEndTime?: string;
	location: SelectedLocationData;
	images: string[];
};
