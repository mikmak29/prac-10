import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8100;

const serverStarter = async () => {
	try {
		await connectDatabase();
		app.listen(PORT, () => {
			console.log(`Server is listening at port ${PORT}`);
		});
	} catch (error) {
		throw new Error(error.message);
	}
};

serverStarter();
