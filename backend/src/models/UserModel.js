import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		job: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default mongoose.models.User || mongoose.model("User", userSchema, "prac10_users");
