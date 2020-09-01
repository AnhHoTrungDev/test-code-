import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Param,
  UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./create-user.dto";
import { AuthService } from "src/auth/auth.service";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("auth/login")
  login(@Body() data: CreateUserDto) {
    return {
      token: this.usersService.login(data)
    };
  }

  @Post("auth/register")
  @HttpCode(204)
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get("user/:userName")
  findUserName(@Param() parama) {
    return this.usersService.getUserName(parama.userName);
  }
}
