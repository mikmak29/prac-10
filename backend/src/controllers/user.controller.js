import asyncErrorHandler from "express-async-handler";
import bcrypt from "bcrypt";

import * as userService from "../services/user.service.js";
import { validateObjectId } from "../helper/validateObjectId.js";
import { conditionalErrorHandler } from "../helper/conditionalErrorHandler.js";
import { generateAccessToken } from "../helper/generateToken.js";

export const fetchUsers = asyncErrorHandler(async (req, res) => {
	const data = await userService.fetchUsersData();

	validateObjectId("dsadas", 404);

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

	res.status(200).json({ accessToken });
});
