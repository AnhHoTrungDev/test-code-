import { Injectable } from "@nestjs/common";
import { Post } from "./interfaces/posts.interface";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [];

  findOneById(id) {
    return this.posts.find(e => e.id == id);
  }

  findAll(id) {
    return this.posts.map(e => e.createdBy.id == id);
  }

  create(post: Post) {
    post.id = uuidv4();
    post.createdAt = Date.now();
    this.posts.push(post);
    return post;
  }
}
