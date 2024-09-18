import { Button, Drawer } from "antd";
import { useRecruitmentContext } from "../context";
import EmailContent from "./EmailContent";
import { useState } from "react";

const RejectDrawer = ({}) => {
  const [state, changeState] = useState<boolean>(false);
  const { editingRecord } = useRecruitmentContext();
  return (
    <>
      <Button type="primary" danger onClick={() => changeState(true)}>
        Reject
      </Button>

      <Drawer
        title={`Reject ${editingRecord.name} ${editingRecord.surname}`}
        width={"30%"}
        closable={true}
        onClose={() => changeState(false)}
        open={state}
      >
        <EmailContent
          onCancel={() => changeState(false)}
          isForRejection={true}
        />
      </Drawer>
    </>
  );
};

export default RejectDrawer;
