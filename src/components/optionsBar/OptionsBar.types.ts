export type LoginErrRes = {
	error?: string;
	message?: string;
	statusCode: number;
};

export type Inputs = {
	email: string;
	first_name: string;
};
