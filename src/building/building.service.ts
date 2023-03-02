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
      // @InjectRepository(BuildingEntity)
      // private readonly imageRepo: Repository<ImageEntity>
  ) {}

  async create(createBuildingDto: CreateBuildingDto){
    // const newBuilding = await this.buildingRepo.create(createBuildingDto);
    // await this.buildingRepo.save(newBuilding);
    // return newBuilding;
    return await this.buildingRepo.save(createBuildingDto);
  }

  async findAll(query) {
  // .createQueryBuilder('build')
  //       .leftJoinAndSelect('build.photo','photos')
  //       .getMany()
    const total = await this.buildingRepo.count();
    const buildings = await this.buildingRepo.find(query);
    return {
      buildings: buildings,
      total: total,
    };
    // return await this.buildingRepo.find();
  }

  async findOne(id: number) {
    return await this.buildingRepo.findBy({id});
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  async remove(id: number) {
    return await this.buildingRepo.delete(id);
  }
}
