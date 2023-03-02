import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'Эл. почта пользователя',
        default: 'admin@mail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        default: 'admin123'
    })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
