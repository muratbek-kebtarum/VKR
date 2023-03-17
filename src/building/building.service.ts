import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingEntity} from "./entities/building.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
// import {ImageEntity} from "../image/image.entity";

@Injectable()
export class BuildingService {
  constructor(
      @InjectRepository(BuildingEntity)
      private readonly buildingRepo: Repository<BuildingEntity>,
  ) {}

  async create(createBuildingDto: CreateBuildingDto){
    return await this.buildingRepo.save(createBuildingDto);
  }

  async findAll(query) {
    const total = await this.buildingRepo.count();
    const buildings = await this.buildingRepo.find(query);
    return {
      buildings: buildings,
      total: total,
    };
  }

  async findOne(id: number) {
    return await this.buildingRepo.findBy({id});
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return this.buildingRepo.update(id, updateBuildingDto);
  }

  async remove(id: number) {
    return await this.buildingRepo.delete(id);
  }
}
