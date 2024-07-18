import { Button, Drawer, Form, Steps } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { EmployeeDataType } from "../../types/Employee";

const steps = [
  {
    title: "Create Employee Account",
    content: <FirstStep />,
  },
  {
    title: "Add Employee Information",
    content: <SecondStep />,
  },
];

type DrawerProps = {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedEmployee?: any;
};

const CreateEmployeDrawer = ({
  open,
  setOpen,
  selectedEmployee,
}: DrawerProps) => {
  console.log(selectedEmployee, "tttttttttt");
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      title={steps[current].title}
      height={550}
      onClose={onClose}
      open={open}
      placement="bottom"
      styles={{ body: { paddingBottom: 80 } }}
    >
      <Form>
        <Steps current={current} items={items} />
        <div> {steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => setOpen(false)}>
              Done
            </Button>
          )}
        </div>
      </Form>
    </Drawer>
  );
};

export default CreateEmployeDrawer;
