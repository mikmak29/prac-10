import User from "../models/UserModel.js";

export const fetchUsersData = async () => {
	return await User.find();
};

export const registerData = async (userData) => {
	return await User.create(userData);
};

export const validateEmail = async (userEmail) => {
	return await User.findOne({ userEmail });
};
