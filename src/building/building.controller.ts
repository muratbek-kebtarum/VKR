import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import {ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {calcSkip, QueryDto} from "../utils/query.dto";
import {FindQuery} from "../utils/decorator-controller";

@ApiTags('Building')
@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  @ApiOperation({ summary: "Create building object" })
  create(@Body() createBuildingDto: CreateBuildingDto) {
    return this.buildingService.create(createBuildingDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all building objects" })
  @FindQuery()
  async findAll(@Query() query: QueryDto) {
    const { page = 1, limit = 5 } = query;
    const skip = calcSkip(page, limit);
    return await this.buildingService.findAll({
      take: +limit,
      skip: skip,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buildingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    return this.buildingService.update(+id, updateBuildingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildingService.remove(+id);
  }
}
