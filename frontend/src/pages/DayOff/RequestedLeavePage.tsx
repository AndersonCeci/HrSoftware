import React, { useState, useEffect } from "react";
import { Flex} from "antd";
import RequestedTable from "./components/RequestedTable";
import { RequestedDataType } from "../../types/RequestedLeave";
import DummyRequestedData from "../../utils/dummyrequestedleave";

const RequestedLeavePage: React.FC = () => {
  const [requestedLeaves, setRequestedLeaves] = useState<RequestedDataType[]>([]);

  useEffect(() => {
    setRequestedLeaves(DummyRequestedData);
  }, []);

  const handleDecline = () => {
    
  };

  return (
    <section className="test">
      <Flex vertical>
        <RequestedTable 
          data={requestedLeaves} 
          onDecline={handleDecline} 
        />
      </Flex>
    </section>
  );
};

export default RequestedLeavePage;
