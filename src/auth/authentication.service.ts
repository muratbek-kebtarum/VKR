import {UserService} from "../user/user.service";
import {HttpException, HttpStatus} from "@nestjs/common";
import {RegisterDto} from "./dto/registerDto";
import * as bcrypt from "bcrypt";

export class AuthenticationService{
    constructor(
        private readonly userService: UserService
    ) {}

    public async register(registrationData: RegisterDto){
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.userService.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
        }catch (e){
            if(e?.code === PostgresErrorCode.UniqueViolation){
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAuthenticatedUser(email: string, plainTextPassword: string){
        try {
            const user = await this.userService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            return user;
        }catch (e) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    async verifyPassword(plainTextPassword: string, hashedPassword: string){
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        )
        if(!isPasswordMatching){
            throw new HttpException('Wrong credntials provided', HttpStatus.BAD_REQUEST);

        }
    }
}