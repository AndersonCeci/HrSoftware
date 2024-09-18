import { useState } from "react";
import { sendRequestType } from "../types/UseHttpTypes";
import { getFromLocalStorage } from "../utils/utils";
const API = import.meta.env.REACT_APP_MAIN;

function POSTHelper(endpoint: string, body: any, headers?: any) {
  return {
    endpoint: endpoint,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method: "POST",
    body: body,
  };
}

function DELETEHelper(endpoint: string, headers?: any) {
  return {
    endpoint: endpoint,
    headers: {
      ...headers,
    },
    method: "DELETE",
  };
}

function PATCHHelper(endpoint: string, body?: any, headers?: any) {
  return {
    endpoint: endpoint,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method: "PATCH",
    body: body,
  };
}
function PUTHelper(endpoint: string, body?: any, headers?: any) {
  return {
    endpoint: endpoint,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method: "PUT",
    body: body,
  };
}

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userData = getFromLocalStorage();

  const sendRequest: sendRequestType = (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const response = await fetch(`${API}/${requestConfig.endpoint}`, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${userData.token}`,
            ...requestConfig.headers,
          },
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const responseData = await response.json();
        applyData ? applyData(responseData) : null;
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
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
useHttp.putRequestHelper = PUTHelper;
