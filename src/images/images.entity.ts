import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BuildingEntity} from "../building/entities/building.entity";

@Entity()
export class ImagesEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => BuildingEntity, building => building.photo)
    building: BuildingEntity;
}