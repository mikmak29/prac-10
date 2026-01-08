import User from "../models/UserModel.js";

export const fetchUsersData = async () => {
	return await User.find();
};
