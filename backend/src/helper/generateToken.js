import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";

dotenv.config();

export const generateAccessToken = asyncErrorHandler(async (user) => {
	return jwt.sign(user, process.env.PRIVATE_ACCESS_TOKEN, { expiresIn: "10m" });
});

export const generateRefreshAccessToken = asyncErrorHandler(async (user) => {
	return jwt.sign(user, process.env.PRIVATE_REFRESH_ACCESS_TOKEN, { expiresIn: "7d" });
});
