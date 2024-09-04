import DismissedTable from "./Dismissed/components/DismissedTable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isHR } from "../utils/utils";

const DismissedPage: React.FC = () => {
	const navigate = useNavigate();
	const isHr = isHR();

	useEffect(() => {
		if (!isHr) {
			navigate("/error");
		}
	}, [isHr]);
	return (
		<div>
			<DismissedTable />
		</div>
	);
};

export default DismissedPage;
