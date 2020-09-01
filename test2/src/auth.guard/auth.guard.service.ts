import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
  CanActivate
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import * as keys from "../keys";
import { AuthorsService } from "../authors/authors.service";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private readonly authorsService: AuthorsService) {}
  async canActivate(context: ExecutionContext) {
    const reques =
      context.switchToHttp().getRequest() ||
      GqlExecutionContext.create(context).getContext();

    // console.log("request:", reques.headers);
    const token = reques && reques.headers.authorization;

    if (!token || token.split(" ")[0] !== "Bearer") {
      throw new HttpException(`Token Fail`, HttpStatus.FORBIDDEN);
    }

    try {
      let decoded = jwt.verify(token.split(" ")[1], keys.keys);
      reques.authorId = decoded.authorID;
      // console.log(decoded);
      return this.authorsService.checkId(decoded.authorID) ? true : false;
    } catch (err) {
      console.error("log err is :", err);
      throw new HttpException(`Token Fail`, HttpStatus.FORBIDDEN);
    }
  }
}
