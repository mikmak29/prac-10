import mongoose from "mongoose";

export const validateObjectId = (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		const error = new Error("Invalid ID ID. Please double-check!");
		error.statusCode = 400;
		throw error;
	}
	return true;
};
