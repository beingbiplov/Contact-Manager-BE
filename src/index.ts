import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";

import logger from "./misc/logger";
import appRoutes from "./routes/index";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

const path = require("path");
const swagger_path = path.resolve(__dirname, "./swagger.yaml");

const swaggerUi = require('swagger-ui-express')
const YAML = require("yamljs");
const swaggerDocument = YAML.load(swagger_path);

dotenv.config();

const app: Application = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

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
