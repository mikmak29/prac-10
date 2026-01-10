import { expressYupMiddleware } from "express-yup-middleware";
import express from "express";

import * as userController from "../controllers/user.controller.js";
import { userSchemaValidator } from "../validators/user.validator.js";
import { userAuthToken } from "../middleware/userAuthToken.js";

const route = express.Router();

route.route("/user/register").post(expressYupMiddleware({ schemaValidator: userSchemaValidator }), userController.registerUser);
route.route("/user/login").post(userController.loginUser);
route.route("/user/refreshToken").post(userController.refreshAccessToken);
route.route("/user/current").get(userAuthToken, userController.currentUserData);
route.route("/user/data").get(userController.currentUserData);

export default route;
