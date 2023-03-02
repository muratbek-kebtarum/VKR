// import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
// import {BuildingEntity} from "../building/entities/building.entity";
// import {JoinColumn} from "typeorm/browser";
//
// @Entity({name:'photo'})
// export class ImageEntity {
//     @PrimaryGeneratedColumn()
//     id: number;
//
//     @Column()
//     filename: string;
//
//     // @Column({
//     //     name:"building_id"
//     // })
//     // buildingId:number;
//
//     // @ManyToOne(() => BuildingEntity, (building: BuildingEntity) => building.photo)
//     // // @JoinColumn({
//     // //     name:"building_id"
//     // // })
//     // building: BuildingEntity;
// }