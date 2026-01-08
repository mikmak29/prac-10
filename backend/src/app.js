import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import express from "express";

import userRoutes from "./routes/userRoutes.js";

const app = express();

/**
 * @param {Object} cors
 */

app.use(helmet());
app.use(cors({
    
}));
app.use(express.json());
app.use(compression());

app.use("/api/user", userRoutes);

export default app;
