import "reflect-metadata";
import "dotenv/config";

import { databaseConnection } from "./infrastructure/database.connection";
import { router } from "./routes";

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const port = 8080;

databaseConnection
	.initialize()
	.then(() => app.listen(port, () => console.log(`Server runing at port ${port}`)))
	.catch(err => console.log("Database connection failed", err));
