import mongoose from "mongoose";

export const validateObjectId = (id, message = "Invalid ID format.", statusCode = 400) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = new Error(message);
		error.statusCode = statusCode;
		throw error;
	}
	return true;
};
