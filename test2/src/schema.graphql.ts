
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum PostCategory {
    PROMOTIONAL = "PROMOTIONAL",
    CONTROVERSIAL = "CONTROVERSIAL",
    LIFESTYLE = "LIFESTYLE",
    PERSONAL = "PERSONAL"
}

export class AuthorInput {
    firstName: string;
    lastName: string;
    dob: number;
}

export class PostInput {
    title: string;
    content: string;
    categories: PostCategory[];
}

export class Author {
    id: string;
    firstName: string;
    lastName: string;
    dob: number;
}

export abstract class IMutation {
    abstract createAuthor(author: AuthorInput): Author | Promise<Author>;

    abstract createPost(postInput: PostInput): Post | Promise<Post>;
}

export class Post {
    id: string;
    title: string;
    content: string;
    categories: PostCategory[];
    createdAt: number;
    createdBy: Author;
}

export abstract class IQuery {
    abstract author(authorID: string): Author | Promise<Author>;

    abstract post(postID: string): Post | Promise<Post>;
}
