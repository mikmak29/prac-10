import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import jwt from "jsonwebtoken";

dotenv.config();

export const generateAccessToken = asyncErrorHandler(async (user) => {
	return jwt.sign(user, process.env.PRIVATE_ACCESS_TOKEN, { expiresIn: "2m" });
});
