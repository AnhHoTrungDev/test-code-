import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(context: ExecutionContext) {
    // Athoriztion
    const req = context.switchToHttp().getRequest();
    const token = req && req.headers.authorization;

    if (!token || token.split(" ")[0] !== "Bearer") {
      throw new HttpException(`Token Fail`, HttpStatus.FORBIDDEN);
    }

    let decoded;

    try {
      decoded = jwt.verify(token.split(" ")[1], "myKey");
    } catch (err) {
      throw new HttpException(`Token Fail`, HttpStatus.FORBIDDEN);
    }
    req.userID = decoded.userID;

    return this.usersService.checkIdUsers(decoded.userID) ? true : false;
  }
}
