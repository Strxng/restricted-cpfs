import "reflect-metadata";
import "dotenv/config";

import { databaseConnection } from "./infrastructure/database.connection";
import { App } from "./app";

const app = new App().getApp();
const port = 8080;

databaseConnection
	.initialize()
	.then(() => app.listen(port, () => console.log(`Server runing at port ${port}`)))
	.catch(err => console.log("Database connection failed", err));

