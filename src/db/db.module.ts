import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {BuildingEntity} from "../building/entities/building.entity";

import {join} from "path";
import dataSource, {dataSourceOptions} from "./typeOrm.config";
// import {AppDataSource} from "./typeOrm.config";

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions
        //     {
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: (configService: ConfigService) => ({
        //         type: 'postgres',
        //         host: configService.get('POSTGRES_HOST'),
        //         port: configService.get('POSTGRES_PORT'),
        //         username: configService.get('POSTGRES_USER'),
        //         password: configService.get('POSTGRES_PASSWORD'),
        //         database: configService.get('POSTGRES_DB'),
        //         entities: [],
        //         autoLoadEntities: true,
        //     }),
        // }
        ),
    ],
})
class DbModule {}

export default DbModule;