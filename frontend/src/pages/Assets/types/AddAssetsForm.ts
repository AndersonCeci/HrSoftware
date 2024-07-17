import type { GetProps } from "antd";
import { DatePicker } from "antd";

export type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;


export type AddAssetFormProps = {
	availableOptions?: { value: string; label: string }[];
	availableEmployees?: { value: string; label: string }[];
	onSuccess: (newAsset: any) => void;
};

