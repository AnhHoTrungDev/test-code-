import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { join } from "path";
import { GraphQLModule } from "@nestjs/graphql";
import { MessagesModule } from "./messages/messages.module";
import { subscribe } from "graphql";
import * as jwt from "jsonwebtoken";
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ["./**/*.graphql"],
      definitions: {
        path: join(process.cwd(), "src/graphql.ts"),
        outputAs: "class"
      },
      installSubscriptionHandlers: true,
      context: ({ req, connection }) => {
        if (connection) {
          return {
            req: connection.context
          };
        }
        return { req };
      },
      subscriptions: {
        onConnect: (connectionParam, ws) => {
          const token = connectionParam["Authorization"];
          if (!token) return false;
          const arrayToken = token.split(" ");
          if (!arrayToken || arrayToken[0] !== "Bearer") {
            console.log("---token null---");
            return false;
          }

          try {
            const decoded = jwt.verify(arrayToken[1], "sup3rs3cr3t");
            console.log("user Sub decoded :", decoded);
            return decoded;
          } catch (err) {
            console.error("err at auth", err);
            return false;
          }
        }
      }
    }),
    AuthModule,
    UsersModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
