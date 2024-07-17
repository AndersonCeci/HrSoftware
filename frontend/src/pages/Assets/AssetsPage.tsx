import AssetProvider from "./context/asset-context";
import AssetContent from "./components/AssetContent";

const AssetsPage: React.FC = () => {
	return (
		<AssetProvider>
			<AssetContent />
		</AssetProvider>
	);
};

export default AssetsPage;
