import { Module } from "@nestjs/common";
import { AuthorResolver } from "./authors.resolver";
import { AuthorsService } from "./authors.service";
// import { PostsModule } from "src/posts/posts.module";

@Module({
  // imports:[PostsModule],
  providers: [AuthorResolver, AuthorsService],
  exports: [AuthorResolver, AuthorsService]
})
export class AuthorsModule {}
