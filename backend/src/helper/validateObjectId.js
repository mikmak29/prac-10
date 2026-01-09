import mongoose from "mongoose";

export const validateObjectId = (message, statusCode) => {
	if (isNaN(statusCode)) {
		const error = new Error("Status code must be a number.");
		error.statusCode = 404;
		throw error;
	}
	if (!mongoose.Schema.Types.ObjectId) {
		const error = new Error(message);
		error.statusCode = statusCode;
		throw error;
	}
};
