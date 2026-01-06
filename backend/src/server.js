import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8100;

const serverStarter = () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server is listening at port ${PORT}`);
		});
	} catch (error) {
		throw new Error({
			message: error.message,
			errorStack: error.stack,
		});
	}
};

serverStarter();
