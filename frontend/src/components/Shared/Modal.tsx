import Button from "./Button";
import { ButtonType } from "../../enums/Button";
import { t } from "i18next";
import { Modal as AntModal, Flex } from "antd";

type ModalProps = {
  children: React.ReactNode;
  onOk?: () => void | undefined;
  isLoading?: boolean;
  onCancel?: () => void | undefined;
  isOpen: true | false;
  title?: string;
  width?: number;
  okBtnText?: string;
  okBtnTextSubmitting?: string;
};

const Modal = ({
  children,
  onOk,
  onCancel,
  isOpen,
  title,
  isLoading,
  width,
  okBtnText = t("submit"),
  okBtnTextSubmitting = t("submitting"),
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
      <Flex justify="flex-end" gap={15}>
        {onCancel && (
          <Button type={ButtonType.TEXT} danger onClick={onCancel}>
            {t("cancel")}
          </Button>
        )}
        {onOk && (
          <Button type={ButtonType.PRIMARY} onClick={onOk} disabled={isLoading}>
            {isLoading ? okBtnTextSubmitting : okBtnText}
          </Button>
        )}
      </Flex>
    </AntModal>
  );
};

export default Modal;
