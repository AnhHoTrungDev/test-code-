import { Query, Resolver, Args, Mutation, Context } from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { PostDto } from "./dto/create-posts.dto";
import { AuthorsService } from "../authors/authors.service";
import { AuthGuardService } from "../auth.guard/auth.guard.service";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class PostResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly authorsService: AuthorsService
  ) {}

  @Query()
  post(@Args("postID") postID: string) {
    return this.postsService.findOneById(postID);
  }

  @Mutation()
  @UseGuards(AuthGuardService)
  createPost(
    @Args("postInput") postInput: PostDto,
    @Context("authorId") authorId
  ) {
    console.log("authorId post:", authorId);
    postInput.createdBy = this.authorsService.findOneById(authorId);
    return this.postsService.create(postInput);
  }
}
