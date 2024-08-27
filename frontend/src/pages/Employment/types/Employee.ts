export type EmployeeDataType = {
	_id: string;
	name: string;
	surname: string;
	username: string; //! THIS POPERTY NEEDS TO BE REMOVED BECAUSE THE USERNAME NO LONGER IS RETURNED FROM THE BACKEND
	fullName: string;
	email: string;
	phoneNumber: number;
	salary: number;
	teamLeader: string;
	startingDate: string;
	position: string;
	nID: string;
	// status: "Working" | "Remote" | "On Leave";
	contract: string;
};
