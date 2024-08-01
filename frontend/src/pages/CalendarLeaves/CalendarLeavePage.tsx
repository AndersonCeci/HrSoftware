import Scheduler from "./components/Scheduler";
import { useState, useEffect } from "react";
import { dummyBackendData } from "./utils/DummyDatas";
import { OnLeaveData } from "./types/DataTypes";

const CalendarLeavePage: React.FC = () => {
	const [dataSource, setDataSource] = useState<OnLeaveData[]>([]);

	useEffect(() => {
		setDataSource(dummyBackendData);
	}, []);

	return (
		<>
			<br />
			<br />
			<Scheduler dataSource={dataSource} allowDragAndDrop allowResizing/>
		</>
	);
};

export default CalendarLeavePage;
