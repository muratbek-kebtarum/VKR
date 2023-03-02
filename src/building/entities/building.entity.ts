import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";

import {Coordinate} from "../interface/coordinate";
import {RegionID} from "../enum/regionID";
// import {ImageEntity} from "../../image/image.entity";

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
    contractOrganization: string;

    @Column()
    fullCost: string;

    @Column()
    financeSrc: string;

    // @OneToMany(() => ImageEntity, (photo: ImageEntity) => photo.building)
    // photo: ImageEntity[];

    @Column({type:"varchar"})
    coords: Coordinate;

}
