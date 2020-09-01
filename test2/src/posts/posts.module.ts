import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostResolver } from "./posts.resolver";
import { AuthorsModule } from "src/authors/authors.module";

@Module({
  imports: [AuthorsModule],
  providers: [PostsService, PostResolver],
  exports: [PostResolver, PostsService]
})
export class PostsModule {}
