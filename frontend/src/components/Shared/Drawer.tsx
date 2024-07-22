import { Drawer as AntDrawer } from "antd";

type DrawerProps = {
	children: React.ReactNode;
	isOpen: boolean;
	placement?: "top" | "right" | "bottom" | "left";
	onClose?: () => void;
	closeIcon?: boolean | null;
	size?: "default" | "large";
	title?: string;
};

const Drawer = ({
	children,
	isOpen,
	placement = "bottom",
	onClose,
	closeIcon,
	size = "default",
	title,
}: DrawerProps) => {
	return (
		<AntDrawer
			height={400}
			closeIcon={closeIcon}
			onClose={onClose}
			destroyOnClose
			open={isOpen}
			placement={placement}
			size={size}
			title={title}
		>
			{children}
		</AntDrawer>
	);
};

export default Drawer;
