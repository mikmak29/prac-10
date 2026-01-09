import asyncErrorHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userService from "../services/user.service.js";
import { validateObjectId } from "../helper/validateObjectId.js";
import { conditionalErrorHandler } from "../helper/conditionalErrorHandler.js";
import { generateAccessToken, generateRefreshAccessToken } from "../helper/generateToken.js";

export const fetchUsers = asyncErrorHandler(async (req, res) => {
	const data = await userService.fetchUsersData();

	res.status(200).json(data);
});

export const registerUser = asyncErrorHandler(async (req, res) => {
	const { username, email, password, job } = req.body; // USER personal information

	if (!username || !email || !password || !job) {
		return conditionalErrorHandler(res, "All fields are required.", 400);
	}

	const isEmailTaken = await userService.validateEmail({ email });

	if (isEmailTaken) {
		return conditionalErrorHandler(res, "Email already exists.", 409);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newData = {
		username,
		email,
		password: hashedPassword,
		job,
	};

	await userService.registerData(newData);

	res.status(201).json({
		status: 201,
		message: "Registered successfully!",
	});
});

export const loginUser = asyncErrorHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return conditionalErrorHandler(res, "Email and password are required.", 400);
	}

	const user = await userService.loginData({ email });

	// Security: Use same message for both invalid email and password to prevent user enumeration
	if (!user) {
		return conditionalErrorHandler(res, "Invalid email or password.", 401);
	}

	const hashedPassword = await bcrypt.compare(password, user.password);

	if (!hashedPassword) {
		return conditionalErrorHandler(res, "Invalid email or password.", 401);
	}

	const accessToken = await generateAccessToken({ user });
	const refreshToken = await generateRefreshAccessToken({ user });

	res.cookie("RefreshToken", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/api/user",
	});

	res.status(200).json({ accessToken, refreshToken });
});

export const refreshAccessToken = asyncErrorHandler(async (req, res) => {
	const token = req.cookies?.RefreshToken;

	if (!token) {
		return conditionalErrorHandler(res, "Refresh token not found.", 401);
	}

	try {
		// Verify the refresh token
		const decoded = jwt.verify(token, process.env.PRIVATE_REFRESH_ACCESS_TOKEN);

		// Extract user data from decoded token
		// The decoded payload contains the user object that was signed during login
		const user = decoded.user || decoded; // Handle both cases

		// Generate a new access token
		const newAccessToken = await generateAccessToken({ user });

		// Optionally generate a new refresh token and update the cookie
		const newRefreshToken = await generateRefreshAccessToken({ user }); // It is called cookie-rotation to prevent the user abusing the access as well as if the token was stolen.

		res.cookie("RefreshToken", newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			path: "/api/user",
		});

		res.status(200).json({
			accessToken: newAccessToken,
			message: "Token refreshed successfully",
		});
	} catch (error) {
		return conditionalErrorHandler(res, "Invalid refreshToken", 409);
	}
});

export const currentUserData = asyncErrorHandler(async (req, res) => {
	const data = req.user;
	if (!data) {
		return conditionalErrorHandler(res, "Couldn't find the data.", 404);
	}

	res.status(200).json(data);
});
