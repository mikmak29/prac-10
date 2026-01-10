import { expressYupMiddleware } from "express-yup-middleware";
import express from "express";

import { userNoteSchemaValidator } from "../validators/user.validator.js";
import { userAuthToken } from "../middleware/userAuthToken.js";
import * as userNoteController from "../controllers/userNote.controller.js";

const route = express.Router();

route.route("/userNote").post(userAuthToken, expressYupMiddleware({ schemaValidator: userNoteSchemaValidator }), userNoteController.createUserNote);
route.route("/userNote").get(userAuthToken, userNoteController.fetchUserNotes);
route.route("/userNote/:id").put(userAuthToken, userNoteController.updateUserNoteById);
route.route("/userNote/:id").delete(userAuthToken, userNoteController.deleteUserNoteById);

export default route;
