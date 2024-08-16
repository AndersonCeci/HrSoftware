import { useState } from "react";
import { sendRequestType } from "../types/UseHttpTypes";

function POSTHelper(url: string, body: any, headers?: any) {
  return {
    url: url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method: "POST",
    body: body,
  };
}

function DELETEHelper(url: string, headers?: any) {
  return {
    url: url,
    headers: {
      ...headers,
    },
    method: "DELETE",
  };
}

function PATCHHelper(url: string, body: any, headers?: any) {
  return {
    url: url,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method: "PATCH",
    body: body,
  };
}

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
			} catch (err: any) {
				console.log(err);
				setError(err || "Something went wrong!");
			}
			setIsLoading(false);
		}
		fetchData();
	};

  return [isLoading, error, sendRequest] as const;
}

useHttp.postRequestHelper = POSTHelper;
useHttp.deleteRequestHelper = DELETEHelper;
useHttp.patchRequestHelper = PATCHHelper;
