import {DataSource, DataSourceOptions} from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import {BuildingEntity} from "../building/entities/building.entity";
// import {B1111677654803713} from "../../migrations/1677654803713-B111";
import {SnakeNamingStrategy} from "./strategies/snake-naming.strategy";
import {User} from "../user/entities/user.entity";

config();

const configService = new ConfigService();
export const dataSourceOptions:DataSourceOptions = {
    type: "postgres",
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities:[BuildingEntity, User],
    namingStrategy:new SnakeNamingStrategy(),
    migrations: [],
    synchronize: true,
}
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;



// export default new DataSource({
//     type: 'postgres',
//     host: configService.get('POSTGRES_HOST'),
//     port: configService.get('POSTGRES_PORT'),
//     username: configService.get('POSTGRES_USER'),
//     password: configService.get('POSTGRES_PASSWORD'),
//     database: configService.get('POSTGRES_DATABASE'),
//     entities: [BuildingEntity],
//     // migrations: [CreateBuilding1677481514450],
//     synchronize: false
// }
// );