import { Injectable, UseGuards } from "@nestjs/common";
import { User } from "./interfaces/users.interface";

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  findOne(id: string) {
    return this.users.find(e => e.id === id);
  }

  
  addUer(user: User) {
    user.id = `${this.users.length}`;
    this.users.push(user);
    return user;
  }
}
