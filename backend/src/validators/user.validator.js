import * as Yup from "yup";
import { USER_CHAR_LENGTH, NOTE_COMPONENTS_CHAR_LENGTH } from "../constants/USER.js";

const { username, email, password, job } = USER_CHAR_LENGTH;
const { title, note } = NOTE_COMPONENTS_CHAR_LENGTH;

export const userSchemaValidator = {
	schema: {
		body: {
			yupSchema: Yup.object().shape({
				username: Yup.string().required("nameProperty").min(username.NAME_MIN).max(username.NAME_MAX),
				email: Yup.string()
					.required("emailProperty")
					.min(email.EMAIL_MIN)
					.max(email.EMAIL_MAX)
					.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
				password: Yup.string().required("passwordProperty").min(password.PW_MIN).max(password.PW_MAX),
				job: Yup.string().required("jobProperty").min(job.JOB_MIN).max(job.JOB_MAX),
			}),
		},
	},
	errorMessages: {
		nameProperty: {
			message: 'The "Username" property is required!',
		},
		emailProperty: {
			message: 'The "Email" property is required!',
		},
		passwordProperty: {
			message: 'The "Password" property is required!',
		},
		jobProperty: {
			message: 'The "Job" property is required!',
		},
	},
};

export const userNoteSchemaValidator = {
	schema: {
		body: {
			yupSchema: Yup.object().shape({
				title: Yup.string().required("titleProperty").min(title.TITLE_MIN).max(title.TITLE_MAX),
				note: Yup.string().required("noteProperty").min(note.NOTE_MIN).max(note.NOTE_MAX),
				statusNote: Yup.string().required("statusNoteProperty").oneOf(["Draft", "Active", "Archived"], "statusNoteInvalid"),
				priority: Yup.string().required("priorityProperty").oneOf(["Low", "Medium", "High"], "priorityInvalid"),
			}),
		},
	},
	errorMessages: {
		titleProperty: {
			message: 'The "Title" property is required.',
		},
		noteProperty: {
			message: 'The "Note" property is required.',
		},
		statusNoteProperty: {
			message: 'The "StatusNote" property is required.',
		},
		statusNoteInvalid: {
			message: 'The "StatusNote" must be one of: draft, active, archived, deleted.',
		},
		priorityProperty: {
			message: 'The "Priority" property is required.',
		},
		priorityInvalid: {
			message: 'The "Priority" must be one of: low, medium, high.',
		},
	},
};
