import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {BuildingEntity} from "../building/entities/building.entity";

import {join} from "path";
import dataSource, {dataSourceOptions} from "./typeOrm.config";
// import {AppDataSource} from "./typeOrm.config";

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
    ],
})
class DbModule {}

export default DbModule;