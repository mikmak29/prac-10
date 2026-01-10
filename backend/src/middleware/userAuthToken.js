import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { conditionalErrorHandler } from "../helper/conditionalErrorHandler.js";

dotenv.config();

export const userAuthToken = asyncErrorHandler(async (req, res, next) => {
	const headers = req.headers.Authorization || req.headers.authorization;
	const token = headers && headers.split(" ")[1];

	if (!token) {
		return conditionalErrorHandler(res, "Authorization token required.", 401);
	}

	jwt.verify(token, process.env.PRIVATE_ACCESS_TOKEN, (error, decoded) => {
		if (error) {
			return conditionalErrorHandler(res, "Invalid Token.", 409);
		}

		// Extract user from decoded token (handle both new and old token structures)
		const user = decoded.user || decoded;

		// Ensure we have _id (required for user identification)
		if (!user || !user._id) {
			return conditionalErrorHandler(res, "Invalid token structure.", 401);
		}

		// Only include safe fields (exclude password, createdAt, updatedAt if present)
		req.user = {
			_id: user._id,
			username: user.username,
			email: user.email,
			job: user.job,
		};

		next();
	});
});
