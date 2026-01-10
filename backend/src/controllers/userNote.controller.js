import asyncErrorHandler from "express-async-handler";

import { conditionalErrorHandler } from "../helper/conditionalErrorHandler.js";
import * as userNoteService from "../services/userNote.service.js";

export const createUserNote = asyncErrorHandler(async (req, res) => {
	const { title, note, statusNote, priority } = req.body;

	if (!title || !note || !statusNote || !priority) {
		return conditionalErrorHandler(res, "All fields are mandatory.", 404);
	}

	// Get userId from authenticated user (set by userAuthToken middleware)
	if (!req.user || !req.user._id) {
		return conditionalErrorHandler(res, "User authentication required.", 401);
	}

	const newData = {
		userId: req.user._id, // Associate note with logged-in user
		title,
		note,
		statusNote,
		priority,
	};

	const createData = await userNoteService.createNote(newData);

	res.status(200).json(createData);
});

export const fetchUserNotes = asyncErrorHandler(async (req, res) => {
	// Get userId from authenticated user (set by userAuthToken middleware)
	if (!req.user || !req.user._id) {
		return conditionalErrorHandler(res, "User authentication required.", 401);
	}

	// Only fetch notes belonging to the authenticated user
	const data = await userNoteService.fetchNotes(req.user._id);

	res.status(200).json(data);
});

export const updateUserNoteById = asyncErrorHandler(async (req, res) => {
	const { id } = req.params;

	const authUser = req.user || req._id;

	if (!authUser) {
		return conditionalErrorHandler(res, "User authentication required.", 401);
	}

	await userNoteService.updateNoteById(id, req.body, true);

	res.status(200).json({
		message: "Note updated successfully!",
	});
});

export const deleteUserNoteById = asyncErrorHandler(async (req, res) => {
	const { id } = req.params;

	const deleteNoteById = await userNoteService.deleteNoteById(id);

	res.status(200).json({
		deleteNoteById,
		message: "Note deleted successfully!",
	});
});
