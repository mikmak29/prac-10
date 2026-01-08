import asyncErrorHandler from "express-async-handler";
import * as userService from "../services/user.service.js";

export const fetchUsers = asyncErrorHandler(async (req, res) => {
	const data = await userService.fetchUsersData();

	res.status(200).json(data);
});
