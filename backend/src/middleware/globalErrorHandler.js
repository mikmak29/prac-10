import { STATUS_CODE } from "../constants/STATUS_CODE.js";

const globalErrorHandler = (error, req, res, next) => {
	const status = error.status || error.statusCode || 500;

	// Find the matching STATUS_CODE entry using Object methods
	const errorFound = Object.values(STATUS_CODE).find((code) => code.status === status);

	// If a matching status code is found, use it; otherwise, use SERVER_ERROR as default
	const statusCode = errorFound || STATUS_CODE.SERVER_ERROR;

	return res.status(statusCode.status).json({
		status: statusCode.status,
		title: statusCode.title,
		message: error.message || "An error occurred",
	});
};

export default globalErrorHandler;
