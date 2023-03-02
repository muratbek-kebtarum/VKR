import {Column} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Coordinate} from "../interface/coordinate";
import {RegionID} from "../enum/regionID";
// import {ImageEntity} from "../../image/image.entity";

export class CreateBuildingDto {

    @ApiProperty({
        description: 'ID региона',
        enum: RegionID,
        default: 1
    })
    @Column()
    regionID: RegionID;

    @ApiProperty({
        type: String,
        description: 'Айыльный аймак',
        default: 'Аламудунский айылный аймак'
    })
    @Column()
    imac: string;

    @ApiProperty({
        type: String,
        description: 'Отрасль',
        default: 'пиломатериалы',
    })
    @Column()
    industry: string;

    @ApiProperty({
        type: String,
        description: 'название строительного объекта',
        default: 'x',
    })
    @Column()
    buildingName: string;

    @ApiProperty({
        type: String,
        description: 'Проектная мощность',
        default: '100000ед',
    })
    @Column()
    power: string;

    @ApiProperty({
        type: String,
        description: 'Заказчик',
        default: 'Паланчаев П.П.',
    })
    @Column()
    customer: string;

    @ApiProperty({
        type: String,
        description: 'Дата начала постройки',
        default: '2018-02-19',
    })
    @Column({type: "date"})
    startYear: string;//*

    @ApiProperty({
        type: String,
        description: 'Дата окончания постройки',
        default: '2021-03-19',
    })
    @Column({type: "date"})
    endYear: string;//*

    @ApiProperty({
        type: String,
        description: 'Проектная организация',
        default: 'Организация',
    })
    @Column()
    projectOrganization: string;

    @ApiProperty({
        type: String,
        description: 'Проектная стоимость объекта',
        default: '1000000000 у.е.',
    })
    @Column()
    buildingCost: string;

    @ApiProperty({
        type: String,
        description: 'договор организации',
        default: 'Договор',
    })
    @Column()
    contractOrganization: string;

    @ApiProperty({
        type: String,
        description: 'Стоимость объекта со всеми расходами',
        default: '1000000000000',
    })
    @Column()
    fullCost: string;

    @ApiProperty({
        type: String,
        description: 'Источник финансирования',
        default: 'ЖК',
    })
    @Column()
    financeSrc: string;

    // @ApiProperty({
    //     type: [String],
    //     description: 'ФОТО',
    //     // default: [{'example.jpg'}],
    // })
    // @Column({type: 'array'})
    // photo: ImageEntity[];

    @ApiProperty({
        type: [String],
        description: 'Координаты строительного объекта',
        default: {latitude: 1.239, longitude: 32.343}
    })
    @Column()
    coords: Coordinate;
}