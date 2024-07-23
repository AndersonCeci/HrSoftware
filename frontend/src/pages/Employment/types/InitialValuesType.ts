import dayjs from "dayjs";

export type initialValuesType = {
	name: string;
	surname: string;
	email: string;
	phone: string;
	salary: number;
	teamLeader: string;
	position: string;
	startDate: dayjs.Dayjs;
};
