import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";

export const databaseConnection = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
	url: process.env.TYPEORM_URL,
	extra: { ssl: true },
	migrations: [`${__dirname}/migrations/*.ts`],
} as DataSourceOptions);
