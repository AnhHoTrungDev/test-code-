import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UserDTO } from "./DTO/create-user.dto";

@Resolver("Users")
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  user(@Args("userID") userID: string) {
    return this.usersService.findOne(userID);
  }

  @Mutation()
  createUser(@Args("user") user: UserDTO) {
    return this.usersService.addUer(user);
  }
}
