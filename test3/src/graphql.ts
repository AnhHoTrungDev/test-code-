
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class MessageInput {
    content: string;
    roomID: string;
}

export class UserInput {
    privileges?: string[];
}

export class Message {
    _id?: string;
    createdBy?: string;
    roomID?: string;
    content?: string;
    createdAt?: number;
}

export abstract class IMutation {
    abstract createMessage(message?: MessageInput): Message | Promise<Message>;

    abstract createUser(user: UserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract message(messageID: string): Message | Promise<Message>;

    abstract user(userID: string): User | Promise<User>;
}

export abstract class ISubscription {
    abstract messageCreated(roomID: string): Message | Promise<Message>;
}

export class User {
    id: string;
    privileges?: string[];
}
