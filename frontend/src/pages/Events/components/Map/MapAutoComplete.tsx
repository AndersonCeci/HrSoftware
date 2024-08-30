import { Autocomplete } from "@react-google-maps/api";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { UseMapReturnType } from "../../hook/useMap";
import { t } from "i18next";

type MapAutocompleteProps = {
	locationData: UseMapReturnType["locationData"];
	setAutocomplete: UseMapReturnType["setAutocomplete"];
	handleMapInputChages: UseMapReturnType["handleMapInputChages"];
	handleAutocompleteSelect: UseMapReturnType["handleAutocompleteSelect"];
};

export default function MapAutocomplete({
	locationData,
	setAutocomplete,
	handleMapInputChages,
	handleAutocompleteSelect,
}: MapAutocompleteProps) {
	const form = Form.useFormInstance();

	const combineNameAndAddress =
		(locationData.name ? locationData.name : "") +
		(locationData.address ? " " : "") +
		locationData.address;

	useEffect(() => {
		form.setFieldsValue({ location: combineNameAndAddress });
	}, [combineNameAndAddress]);

	return (
		<Autocomplete
			onLoad={(autocomplete) => setAutocomplete(autocomplete)}
			onPlaceChanged={handleAutocompleteSelect}
		>
			<Form.Item
				rules={[
					{
						required: true,
						message: t("errorMessagesLocation"),
					},
				]}
				name={"location"}
				label={t("location")}
			>
				<Input
					placeholder={t("enterLocation")}
					value={combineNameAndAddress}
					onChange={(e) => handleMapInputChages(e.target.value)}
					size="large"
				/>
			</Form.Item>
		</Autocomplete>
	);
}
