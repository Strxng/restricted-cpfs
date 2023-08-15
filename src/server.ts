import "reflect-metadata";
import "dotenv/config";

import { databaseConnection } from "./infrastructure/database.connection";
import { App } from "./app";

const app = new App().getApp();
const port = 8080;

const start = async () => {
	try {
		await databaseConnection.initialize();
		await databaseConnection.runMigrations();
		app.listen(port, () => console.log(`Server runing at port ${port}`));
	} catch (error) {
		console.log(error);
	}
};

start();