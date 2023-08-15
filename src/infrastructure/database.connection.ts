import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";

export const databaseConnection = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
	url: process.env.TYPEORM_URL,
	migrations: [`${__dirname}/migrations/*.ts`],
	entities: [`${__dirname}/entities/*.{ts,js}`],
	extra: {
		ssl: true
	}
} as DataSourceOptions);
