import { Steps as S } from "antd";

type StepsProps = {
	current: number;
	items: any[];
	responsive?: boolean;
	direction?: "horizontal" | "vertical";
};

const Steps = ({ current, items, responsive, direction }: StepsProps) => {
	return <S style={{
        display: "flex",
        flexDirection: direction === "vertical" ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "0 10px",
        margin: "0",
    }} current={current} responsive={responsive} direction={direction} items={items} />;
};

export default Steps;
