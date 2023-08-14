import "reflect-metadata";
import "dotenv/config";

import express from "express";
import cors from "cors";
import { databaseConnection } from "./infrastructure/database.connection";
import { CpfPostComposititon } from "./compositions/cpf.post.composition";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/cpf", (req, res) => new CpfPostComposititon().compose().route(req, res));

databaseConnection
	.initialize()
	.then(() => {
		app.listen(8080, () => console.log(`server runing at port ${8080}`));
	})
	.catch(err => console.log("Database connection failed", err));
