import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
// import dataSource from "../db/typeOrm.config";
import {User} from "../user/entities/user.entity";
import {UpdateUserDto} from "../user/dto/update-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        // Check if user exists
        const userExists = await this.usersService.getByEmail(
            createUserDto.email,
        );
        if (userExists) {
            throw new BadRequestException('User already exists');
        }

        // Hash password
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
            ...createUserDto,
            password: hash,
        });
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return tokens;
    }

    async signIn(data: AuthDto) {
        // Check if user exists
        const user = await this.usersService.getByEmail(data.email);
        if (!user) throw new BadRequestException('User does not exist');
        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches)
            throw new BadRequestException('Password is incorrect');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async logout(userId: number) {
        console.log(9999)
        // const user = await this.usersService.getByEmail(
        //     createUserDto.email,
        // );
        return await this.usersService.update(userId, {refreshToken:null});
    }

    hashData(data: string) {
        return argon2.hash(data);
    }

    async updateRefreshToken(id:number, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(id, {
            refreshToken: hashedRefreshToken,
        });
    }

    async getTokens(userId: number, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.usersService.findOne(userId);
        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied');
        const refreshTokenMatches = await argon2.verify(
            user.refreshToken,
            refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
}