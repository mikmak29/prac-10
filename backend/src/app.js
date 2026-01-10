import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import express from "express";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.routes.js";
import userNoteRoute from "./routes/userNote.routes.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.use("/api", userRoute);
app.use("/api", userNoteRoute);

app.use(globalErrorHandler);

export default app;
