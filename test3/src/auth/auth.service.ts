import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext().req;
    // console.log("ctx", ctx);
    if (!ctx) return true;

    const token = ctx.headers && ctx.headers.authorization;
    console.log("token at auth:", token);
    if (!token || token.split(" ")[0] !== "Bearer") return false;
    try {
      let decoded = jwt.verify(token.split(" ")[1], "sup3rs3cr3t");
      console.log("decoded at auth:", decoded);
      ctx.privileges = decoded.privileges;
      ctx.userID = decoded.userID;
    } catch (err) {
      console.error("err at auth", err);
      return false;
    }

    return true;
  }
}
