import { Button, Form, Input } from "antd";
import { MutableRefObject, useContext } from "react";
import Modal from "../../../components/Shared/Modal";
import { ModalContext, SalaryContext } from "../context";

interface AddBonusProps {
  addBonusRef: MutableRefObject<any>;
  handleAddBonusSubmit: (values: any) => void;
}

const AddBonusModal: React.FC<AddBonusProps> = ({
  addBonusRef,
  handleAddBonusSubmit,
}) => {
  const { selectedSalary } = useContext(SalaryContext)!;
  const { isAddBonusModalOpen, setIsAddBonusModalOpen } = useContext(ModalContext)!;

  if (!selectedSalary) {
    return null;
  }

  return (
    <Modal
      isOpen={isAddBonusModalOpen}
      onCancel={() => setIsAddBonusModalOpen(false)}
      onOk={() => addBonusRef.current.submit()}
    >
      <Form
        ref={addBonusRef}
        id="add-bonus-form"
        onFinish={handleAddBonusSubmit}
        style={{ padding: 40 }}
        initialValues={{
          ...selectedSalary,
          bonuses: selectedSalary.bonuses?.map((bonus, index) => ({
            ...bonus,
            key: index.toString(),
          })) || [],
        }}
      >
        <h2>Add bonuses</h2>
        <Form.List name="bonuses">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Item
                    {...restField}
                    name={[name, "desc"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing bonus description",
                      },
                    ]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <Input placeholder="Bonus Description" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "amount"]}
                    rules={[
                      { required: true, message: "Missing bonus amount" },
                    ]}
                    style={{ flex: 1, marginRight: 8 }}
                  >
                    <Input type="number" placeholder="Bonus Amount" />
                  </Form.Item>
                  <Button
                    style={{ marginBottom: "25px" }}
                    onClick={() => remove(name)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "30%",
                    float: "right",
                    backgroundColor: "lightgrey",
                  }}
                >
                  Add new bonus
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddBonusModal;
