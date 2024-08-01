import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import RequestedTable from "./components/RequestedTable";


const RequestedLeavePage: React.FC = () => {
	return (
		<section className="test">
			<Flex vertical>
				<RequestedTable />
			</Flex>
		</section>
	);
};

export default RequestedLeavePage;
