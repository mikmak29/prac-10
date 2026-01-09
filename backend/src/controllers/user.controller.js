import asyncErrorHandler from "express-async-handler";
import bcrypt from "bcrypt";
import * as userService from "../services/user.service.js";
import { validateObjectId } from "../helper/validateObjectId.js";
import { conditionalErrorHandler } from "../helper/conditionalErrorHandler.js";

export const fetchUsers = asyncErrorHandler(async (req, res) => {
	const data = await userService.fetchUsersData();

	validateObjectId("dsadas", 404);

	res.status(200).json(data);
});

export const registerUser = asyncErrorHandler(async (req, res) => {
	const { username, email, password, job } = req.body; // USER personal information

	if (!username || !email || !password || !job) {
		conditionalErrorHandler("Fields are required to fill.", 404);
	}

	const isEmailTaken = await userService.validateEmail(email);

	if (isEmailTaken) {
		conditionalErrorHandler("This Email is already exist.", 404);
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newData = {
		username,
		email,
		password: hashedPassword,
		job,
	};

	await userService.registerData(newData);

	res.status(201).json(newData);
});
