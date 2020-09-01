import { Controller, Get, UseGuards, Post, Req } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Controller("product")
export class ProductsController {
  @Get("/public")
  getOne(): string {
    return "public content";
  }

  @Get("/protected")
  @UseGuards(AuthService)
  getOneProtected(@Req() request): string {
    return `private content of ${request.userID}`;
  }
}
