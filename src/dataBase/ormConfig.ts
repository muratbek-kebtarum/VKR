import {DataSource, DataSourceOptions} from "typeorm";
import * as dotenv from 'dotenv';
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
export const ormconfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port:  +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
    // migrations: ['./src/migrations/*.ts'],
    migrationsTableName: "migration"
};