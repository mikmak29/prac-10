import UserNote from "../models/UserNoteModel.js";

export const createNote = async (userNoteData) => {
	return await UserNote.create(userNoteData);
};

export const fetchNotes = async (userId) => {
	// Only fetch notes belonging to the specified user
	return await UserNote.find({ userId });
};

export const updateNoteById = async (userId, reqBody, boolean) => {
	return await UserNote.findByIdAndUpdate(userId, reqBody, { new: boolean });
};

export const deleteNoteById = async (userId) => {
	return await UserNote.findByIdAndDelete(userId);
};

export const validateUserNoteById = async (userId) => {
	return await UserNote.findOne(userId);
};
