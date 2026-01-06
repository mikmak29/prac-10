import express from "express";
import * as userController from "../controllers/user.controller.js";

const route = express.Router();

route.route("/").get(userController.fetchUsers);

export default route;
