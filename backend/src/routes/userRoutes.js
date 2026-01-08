import express from "express";
import { fetchUsers } from "../controllers/user.controller.js";

const route = express.Router();

route.route("/data").get(fetchUsers);

export default route;
