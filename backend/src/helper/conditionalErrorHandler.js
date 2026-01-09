// CODE REFACTORED
export const conditionalErrorHandler = (res, message, status) => {
	return res.status(status).json({
		status: status,
		message: message,
	});
};
