import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";

import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./misc/logger";
import appRoutes from "./routes/index";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running....");
});

app.use("/api", appRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
