import { useState } from "react";

import Button from "./Button";
import { ButtonSize, ButtonType } from "../../enums/Button";

import { Modal as AntModal, Flex } from "antd";

type ModalProps = {
	children: React.ReactNode;
	onOk?: () => void | undefined;
	onCancel?: () => void | undefined;
	isOpen: boolean;
};

const Modal = ({ children, onOk, onCancel, isOpen }: ModalProps) => {
	return (
		<AntModal open={isOpen} onCancel={onCancel} onOk={onOk} footer={null}>
			{children}
			<Flex justify="flex-end">
				{onCancel && (
					<Button type={ButtonType.TEXT} danger onClick={onCancel}>
						Cancel
					</Button>
				)}
				{onOk && (
					<Button type={ButtonType.PRIMARY} onClick={onOk}>
						Ok
					</Button>
				)}
			</Flex>
		</AntModal>
	);
};

export default Modal;
