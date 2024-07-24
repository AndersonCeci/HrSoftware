import { Flex } from "antd";

import RequestedTable from "./components/RequestedTable";
import LeaveTable from "./components/LeaveTable";

const RequestedLeavePage: React.FC = () => {

  return (
    <section className="test">
      <Flex vertical>
        <RequestedTable/>
        <LeaveTable/>
        </Flex>
    </section>
  );
};

export default RequestedLeavePage;
