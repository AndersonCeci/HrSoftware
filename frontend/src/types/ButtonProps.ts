import { ButtonSize, ButtonType } from "../enums/Button";

export type ButtonProps = {
	children?: React.ReactNode | undefined;
	onClick?: () => void;
	size?: ButtonSize;
	icon?: React.ReactNode | undefined;
	type?: ButtonType;
	ghost?: boolean;
	danger?: boolean;
	block?: boolean;
};