type RequestConfigType = {
	url: string;
	method?: string;
	headers?: any;
	body?: any;
};

export type sendRequestType = (
	requestConfig: RequestConfigType,
	applyData: (data: any) => void,
) => void;
