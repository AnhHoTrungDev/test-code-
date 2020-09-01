import {
  Query,
  Resolver,
  Args,
  Mutation,
  ResolveProperty,
  Parent
} from "@nestjs/graphql";
import { AuthorsService } from "./authors.service";
import { AuthorDto } from "./dto/create-authors.dto";
// import { PostsService } from "src/posts/posts.service";

@Resolver()
export class AuthorResolver {
  constructor(
    private readonly authorsService: AuthorsService // private readonly postsService: PostsService
  ) {}

  @Query()
  author(@Args("authorID") authorID: string) {
    return this.authorsService.findOneById(authorID);
  }

  @Mutation()
  createAuthor(@Args("author") author: AuthorDto) {
    return this.authorsService.create(author);
  }
}
