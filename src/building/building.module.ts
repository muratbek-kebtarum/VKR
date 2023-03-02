import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BuildingEntity} from "./entities/building.entity";
// import {ImageEntity} from "../image/image.entity";

@Module({
  imports: [TypeOrmModule.forFeature([
      BuildingEntity,
      // ImageEntity
  ])],
  controllers: [BuildingController],
  providers: [BuildingService]
})
export class BuildingModule {}
