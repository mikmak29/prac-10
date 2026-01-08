import dotenv from "dotenv";
import asyncErrorHandler from "express-async-handler";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URL;

const connectDatabase = asyncErrorHandler(async () => {
	const db = await mongoose.connect(MONGO_URI);
	console.log(`Database successfully connected at ${db.connection.db.databaseName}`);
});

export default connectDatabase;
