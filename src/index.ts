import "reflect-metadata";
import "dotenv/config";

import express from "express";
import cors from "cors";
import { databaseConnection } from "./database/connection";

const app = express();

app.use(cors());
app.use(express.json());

databaseConnection
	.initialize()
	.then(() => {
		app.listen(8080, () => console.log("server runing"));
	})
	.catch(err => console.log("falha ao conectar com o banco", err));
