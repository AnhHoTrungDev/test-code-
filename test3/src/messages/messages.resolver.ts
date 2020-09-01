import {
  Resolver,
  Query,
  Args,
  Mutation,
  Subscription,
  Context
} from "@nestjs/graphql";
import { MessagesService } from "./messages.service";
import { MessageDTO } from "./DTO/create-message.dto";
import { PubSub } from "graphql-subscriptions";
import { AuthService } from "src/auth/auth.service";
import { UseGuards } from "@nestjs/common";

const pubSub = new PubSub();
@Resolver("Messages")
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Query()
  message(@Args("messageID") messageID: string) {
    return this.messagesService.getOne(messageID);
  }

  @UseGuards(AuthService)
  @Mutation()
  createMessage(@Args("message") message: MessageDTO, @Context() ctx) {
    console.log("privileges at mess reso:", ctx.req.privileges);
    const createdMessage = this.messagesService.createMessage(
      message,
      ctx.req.userID
    );
    pubSub.publish("messageCreated", {
      messageCreated: createdMessage
    });
    return createdMessage;
  }

//   @UseGuards(AuthService)
  @Subscription("messageCreated", {
    filter: (payload, variables, context) => {
      // payload => data gởi về
      // variables =>  room => check cái này
      // context => cái gán vào ở auth

      console.log(
        "--------------------at subscription------------------------"
      );
      console.log("payload =>", payload);
      console.log("variables =>", variables);
      console.log("context =>", context);
      console.log(
        "--------------------End at subscription------------------------"
      );

      //   console.log("variables.roomID :", variables.roomID);
      //   console.log("payload.roomID :", payload.messageCreated.roomID);
      //   console.log(
      //     "variables.roomID !== payload.roomID :",
      //     variables.roomID !== payload.roomID
      //   );

      if (
        !variables ||
        variables.roomID !== payload.messageCreated.roomID ||
        context.req.privileges.indexOf(payload.messageCreated.roomID) === -1
      )
        return false;

      return true;
    }
  })
  messageCreated() {
    // PubSub là  vong lập => thiết  lập connection
    return pubSub.asyncIterator("messageCreated");
  }
}
