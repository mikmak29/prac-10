import express from "express";
import * as userController from "../controllers/user.controller.js";

const route = express.Router();

route.route("/user/register").post(userController.registerUser);
route.route("/user/current").get(userController.fetchUsers);

export default route;
