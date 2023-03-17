import {ApiProperty} from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({
        description: 'email',
        default: 'admin@mail.com'
    })
    email: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        default: 'admin123'
    })
    password: string;
}