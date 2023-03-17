import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus, Param,
    Post,
    Req, UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {AccessTokenGuard} from "../common/guards/accessToken.guard";
import RequestWithUser from "./requestWithUser.interface";
import {RefreshTokenGuard} from "../common/guards/refreshToken";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Post('signin')
    signin(@Body() data: AuthDto) {
        return this.authService.signIn(data);
    }

    @UseGuards(AccessTokenGuard)
    @Get('logout')

    logout(@Req() req: RequestWithUser) {
        this.authService.logout(req.user['sub']);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: RequestWithUser) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];
        return this.authService.refreshTokens(userId, refreshToken);
    }
}