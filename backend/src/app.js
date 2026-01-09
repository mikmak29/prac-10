import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import express from "express";

import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());

app.use("/api", userRoutes);

export default app;
