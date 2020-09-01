import { Module } from "@nestjs/common";
import { join } from "path";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthorsModule } from "./authors/authors.module";
import { PostsModule } from "./posts/posts.module";
import { AuthGuardModule } from "./auth.guard/auth.guard.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ["./**/*.graphql"],
      context: ({ req }) => ({ headers: req.headers }),
      definitions: {
        path: join(process.cwd(), "src/schema.graphql.ts"),
        outputAs: "class"
      }
    }),
    AuthorsModule,
    PostsModule,
    AuthGuardModule
  ]
})
export class AppModule {}
