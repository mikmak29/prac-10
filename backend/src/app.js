import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import express from "express";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());

export default app;
