import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {Coordinate} from "../interface/coordinate";
import {RegionID} from "../enum/regionID";
import {ImagesEntity} from "../../images/images.entity";

@Entity({name:'buildings'})
export class BuildingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    regionID: RegionID;

    @Column()
    imac: string;

    @Column()
    industry: string;

    @Column()
    buildingName: string;

    @Column()
    power: string;

    @Column()
    customer: string;


    @Column()
    startYear: string;//*

    @Column()
    endYear: string;//*

    @Column()
    projectOrganization: string;

    @Column()
    buildingCost: string;

    @Column()
    contractOrganization: string

    @Column()
    fullCost: string;

    @Column()
    financeSrc: string;

    @OneToMany(() => ImagesEntity, photo => photo.building)
    photo: ImagesEntity[];

    @Column({type:"varchar"})
    coords: Coordinate;

}
