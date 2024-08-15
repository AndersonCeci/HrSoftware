export type EvenType = {
  _id: string;
  eventName: string;
  eventDescription?: string;
  eventDate: Date;
  eventStartTime: string;
  eventEndTime: string;
  location?: string;
  image?: string;
};
