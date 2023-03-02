import { Module } from '@nestjs/common';
import { BuildingModule } from './building/building.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
// import {ormConfig} from "./db/Orm.config";
import DbModule from "./db/db.module";
import {MulterModule} from "@nestjs/platform-express";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import { UserModule } from './user/user.module';
import Joi from "@hapi/joi";

@Module({
  imports: [
      DbModule,
      MulterModule.register({
          dest: './files',
      }),
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'files')
      }),
      BuildingModule,
      UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
