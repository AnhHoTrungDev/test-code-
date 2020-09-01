import { Injectable } from "@nestjs/common";
import { Author } from "./interfaces/authors.interface";
import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import * as keys from "../keys";

@Injectable()
export class AuthorsService {
  private readonly authors: Author[] = [
    {
      id: "1",
      firstName: "string",
      lastName: "string",
      dob: 123213213
    },
    {
      id: "2",
      firstName: "string",
      lastName: "string",
      dob: 111
    },
    {
      id: "3",
      firstName: "string",
      lastName: "string",
      dob: 22
    }
  ];

  findOneById(id) {
    return this.authors.find(e => e.id == id);
  }

  checkId(id) {
    return this.authors.findIndex(e => e.id === id) === -1 ? false : true;
  }

  findALL() {
    return this.authors;
  }

  create(author: Author) {
    let idAuthor = uuidv4();
    let token = jwt.sign(
      {
        authorID: `${idAuthor}`
      },
      keys.keys
    );
    console.log("token :", token);
    author.id = idAuthor;
    this.authors.push(author);
    return author;
  }
}
