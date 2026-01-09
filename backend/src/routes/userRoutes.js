import { expressYupMiddleware } from "express-yup-middleware";
import express from "express";

import * as userController from "../controllers/user.controller.js";
import { userSchemaValidator } from "../validators/test.validator.js";

const route = express.Router();

route.route("/user/register").post(expressYupMiddleware({ schemaValidator: userSchemaValidator }), userController.registerUser);
route.route("/user/login").post(userController.loginUser);
route.route("/user/current").get(userController.fetchUsers);

export default route;
