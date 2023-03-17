import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User) private userRepo: Repository<User>,
      private jwtService: JwtService,
      private configService: ConfigService,
  ) {}


  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser)
    return newUser;
  }

  async findAll(){
    return this.userRepo.find();
  }

  async findOne(id: number) {
    return this.userRepo.findOne({where: {id}});
  }

  async getByEmail(email: string) {
    return this.userRepo.findOne({where: {email}  });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const changed = Object.assign(user, updateUserDto);
    // return this.userRepo.save(changed);
    // Hash password
    // const hash = await this.hashData(updateUserDto.password);
    // const newUser = await this.userRepo.update(id,{
    //   ...updateUserDto,
    //   password: hash,
    //
    // });
    // const tokens = await this.getTokens(newUser.id, newUser.email);
    // await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return changed;
    // return this.userRepo.update(id, updateUserDto);
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
  async find(){

  }

  async updateRefreshToken(id:number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userRepo.update(id, {
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


  async remove(id: number) {
    return this.userRepo.delete(id);
  }
}
