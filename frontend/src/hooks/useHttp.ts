import { useState } from "react";

export type RequestConfigType = {
	url: string;
	method?: string;
	headers?: any;
	body?: any;
};

export type sendRequestType = (
	requestConfig: RequestConfigType,
	applyData?: (data: any) => void, 
) => void;

export default function useHttp() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const sendRequest: sendRequestType = (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);

		async function fetchData() {
			try {
				const response = await fetch(requestConfig.url, {
					method: requestConfig.method ? requestConfig.method : "GET",
					headers: requestConfig.headers ? requestConfig.headers : {},
					body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
				});

				if (!response.ok) {
					throw new Error("Request failed!");
				}

				const responseData = await response.json();
				applyData ? applyData(responseData) : null;
			} catch (err) {
				setError("Something went wrong!");
			}
			setIsLoading(false);
		}
		fetchData();
	};

	return [isLoading, error, sendRequest] as const;
}
