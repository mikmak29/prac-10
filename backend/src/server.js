import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import app from "./app.js";
import connectDatabase from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8100;

const serverStarter = asyncErrorHandler(async () => {
	await connectDatabase();
	app.listen(PORT, () => {
		console.log(`Server is listening at port ${PORT}`);
	});
});

serverStarter();
