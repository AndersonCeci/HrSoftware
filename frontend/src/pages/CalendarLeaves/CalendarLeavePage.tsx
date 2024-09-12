import Scheduler from "./components/Scheduler";
import { useState, useEffect } from "react";
import { OnLeaveData } from "./types/DataTypes";
import useHttp from "../../hooks/useHttp";

const API = import.meta.env.REACT_APP_DAYOFF_API;

const CalendarLeavePage: React.FC = () => {
	const [dataSource, setDataSource] = useState<OnLeaveData[]>([]);
	const [, , fetchData] = useHttp();

	useEffect(() => {
		fetchData(
			{
				url: `${API}/accepted`,
			},
			(data) => {
				setDataSource(data);
			},
		);
	}, []);

	console.log(dataSource);

	return (
		<section className="scheduler-container">
			<Scheduler dataSource={dataSource} allowDragAndDrop allowResizing />
		</section>
	);
};

export default CalendarLeavePage;
