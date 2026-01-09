import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { conditionalErrorHandler } from "../helper/conditionalErrorHandler.js";

dotenv.config();

export const userAuthToken = asyncErrorHandler(async (req, res, next) => {
	const headers = req.headers.Authorization || req.headers.authorization;
	const token = headers && headers.split(" ")[1];

	jwt.verify(token, process.env.PRIVATE_ACCESS_TOKEN, (error, decoded) => {
		if (error) {
			return conditionalErrorHandler(res, "Invalid Token.", 409);
		}
		req.user = decoded.user;
		next();
	});
});
