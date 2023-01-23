import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import route from "./routes/index";
import cookiePrser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
const app = express();

app.use(express.json());
app.use(cookiePrser());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/v2", route);

app.use(notFound);
app.use(errorHandler);

export default app;
