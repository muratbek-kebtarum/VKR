import { Module } from '@nestjs/common';
import { BuildingModule } from './building/building.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {ormconfig} from "./dataBase/ormConfig";

@Module({
  imports: [
      TypeOrmModule.forRoot(ormconfig
      //     {
      //     type: 'postgres',
      //     host: 'localhost',
      //     port: 5432,
      //     username: 'builder',
      //     password: 'building',
      //     database: 'building',
      //     entities: [],
      //     synchronize: true,
      // }
      ),
      BuildingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
