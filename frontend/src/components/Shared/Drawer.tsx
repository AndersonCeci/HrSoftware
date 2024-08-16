import { Drawer as AntDrawer } from "antd";

type DrawerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  placement?: "top" | "right" | "bottom" | "left";
  onClose?: () => void;
  height?: number;
  closeIcon?: boolean | null;
  size?: "default" | "large";
  title?: string;
};

const Drawer = ({
  children,
  isOpen,
  placement = "bottom",
  onClose,
  height = 400,
  closeIcon,
  size = "default",
  title,
}: DrawerProps) => {
  return (
    <AntDrawer
      height={height}
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
