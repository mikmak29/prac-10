import mongoose from "mongoose";

const userNoteSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		note: {
			type: String,
			required: true,
		},
		statusNote: {
			type: String,
			enum: ["Draft", "Active", "Archived"],
			default: "Active",
			required: true,
		},
		priority: {
			type: String,
			enum: ["Low", "Medium", "High"],
			default: "Low",
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

// Index for better query performance
userNoteSchema.index({ userId: 1, statusNote: 1 });

export default mongoose.models.UserNote || mongoose.model("UserNote", userNoteSchema, "prac10_user_notes");
