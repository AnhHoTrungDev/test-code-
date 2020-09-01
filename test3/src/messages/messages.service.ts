import { Injectable } from "@nestjs/common";
import { Message } from "./interfaces/create-message.dto";

@Injectable()
export class MessagesService {
  private readonly messages: Message[] = [];

  getOne(messageID: string) {
    return this.messages.find(e => e._id === messageID);
  }

  createMessage(message: Message, userID: string) {
    message._id = `${this.messages.length}`;
    message.createdAt = Date.now();
    message.createdBy = userID;
    this.messages.push(message);
    return message;
  }
}
