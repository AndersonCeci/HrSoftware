import { Drawer as AntDrawer } from "antd";

type DrawerProps = {
	children: React.ReactNode;
	isOpen: boolean;
	placement?: "top" | "right" | "bottom" | "left";
	onClose?: () => void;
	closeIcon?: boolean | null;
	size?: "default" | "large";
};

const Drawer = ({
	children,
	isOpen,
	placement = "bottom",
	onClose,
	// closeIcon = null,
	size = "default",
}: DrawerProps) => {
	return (
		<AntDrawer
			// closeIcon={closeIcon}
			onClose={onClose}
			destroyOnClose
			open={isOpen}
			placement={placement}
			size={size}
            
		>
			{children}
		</AntDrawer>
	);
};

export default Drawer;
