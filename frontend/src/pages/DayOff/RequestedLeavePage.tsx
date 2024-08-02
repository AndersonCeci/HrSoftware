import React, { useState, useEffect } from "react";
import { Flex, Modal } from "antd";
import RequestedTable from "./components/RequestedTable";

const RequestedLeavePage: React.FC = () => {
	return (
		<section className="test">
			<RequestedTable />
		</section>
	);
};

export default RequestedLeavePage;
