import Button from "./Button";
import { ButtonType } from "../../enums/Button";

import { Modal as AntModal, Flex } from "antd";

type ModalProps = {
  children: React.ReactNode;
  onOk?: () => void | undefined;
  isLoading?: boolean;
  onCancel?: () => void | undefined;
  isOpen: true | false;
  title?: string;
  width?: number;
};

const Modal = ({
  children,
  onOk,
  onCancel,
  isOpen,
  title,
  isLoading,
  width,
}: ModalProps) => {
  return (
    <AntModal
      title={title}
      destroyOnClose
      open={isOpen}
      onCancel={onCancel}
      onOk={onOk}
      footer={null}
      width={width}
      style={{ top: 20 }}
    >
      {children}
      <Flex justify="flex-end">
        {onCancel && (
          <Button type={ButtonType.TEXT} danger onClick={onCancel}>
            Cancel
          </Button>
        )}
        {onOk && (
          <Button type={ButtonType.PRIMARY} onClick={onOk}>
            {isLoading ? "Submiting..." : "Submit"}
          </Button>
        )}
      </Flex>
    </AntModal>
  );
};

export default Modal;
