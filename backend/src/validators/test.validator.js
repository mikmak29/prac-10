import * as Yup from "yup";
import { USER_CHAR_LENGTH } from "../constants/USER.js";

const { username, email, password, job } = USER_CHAR_LENGTH;

export const userSchemaValidator = {
	schema: {
		body: {
			yupSchema: Yup.object().shape({
				userame: Yup.string().required("nameProperty").min(username.NAME_MIN).max(username.NAME_MAX),
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
