import { forwardRef, useImperativeHandle, useRef } from "react";

import Button from "./Button";
import { ButtonSize, ButtonType } from "../../enums/Button";

import "../../styles/Shared/Modal.css";

type ModalProps = {
	children: React.ReactNode;
	onClose?: () => void | undefined;
	onOk?: () => void | undefined;
	// title?: string | undefined;
};

const Modal = forwardRef(({ children, onClose, onOk }: ModalProps, ref) => {
	const modalRef = useRef<HTMLDialogElement>(null);

	useImperativeHandle(ref, () => {
		return {
			open: () => {
				modalRef.current?.showModal();
			},
			close: () => {
				modalRef.current?.close();
			},
		};
	});
	return (
		<dialog className="modal" ref={modalRef}>
			<div className="dialog">
				{children}
				<div className="modal-button-container-of-doom">
					{onClose && (
						<Button onClick={onClose} danger type={ButtonType.TEXT} size={ButtonSize.LARGE}>
							Close
						</Button>
					)}
					{onOk && (
						<Button onClick={onOk} type={ButtonType.PRIMARY} size={ButtonSize.LARGE}>
							Accept
						</Button>
					)}
				</div>
			</div>
		</dialog>
	);
});

export default Modal;
