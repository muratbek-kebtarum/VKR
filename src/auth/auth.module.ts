import { Module } from '@nestjs/common';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import {RefreshTokenStrategy} from "./strategies/refreshToken.strategy";
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [ AuthService, AccessTokenStrategy, RefreshTokenStrategy, JwtService, ConfigService],
})
export class AuthModule {}