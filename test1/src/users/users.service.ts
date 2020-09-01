import {
  Injectable,
  HttpException,
  HttpStatus,
  UseGuards
} from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  login(user: User) {
    let getUser = this.users.find(e => e.username === user.username);
    let pass;
    if (getUser) pass = getUser.password;
    else throw new HttpException(`users name  not exist`, HttpStatus.CONFLICT);

    if (bcrypt.compareSync(user.password, pass)) {
      let token = jwt.sign(
        {
          userID: `${getUser._id}`
        },
        "myKey"
      );
      return token;
    } else {
      throw new HttpException(`login Fail`, HttpStatus.CONFLICT);
    }
  }

  create(user: User) {
    if (this.checkDupliUserName(user.username)) {
      throw new HttpException(`User Name is exist`, HttpStatus.CONFLICT);
    } else {
      const hash = bcrypt.hashSync(user.password, 10);
      this.users.push({
        name: user.name,
        username: user.username,
        password: hash,
        _id: `${this.users.length}`
      });
    }
  }

  getAll(): User[] {
    return this.users;
  }

  checkDupliUserName(userName) {
    return this.users.findIndex(user => user.username === userName) === -1
      ? false
      : true;
  }

  checkIdUsers(id) {
    return this.users.findIndex(user => user._id === id) === -1 ? false : true;
  }

  getUserName(userName) {
    return this.users.find(user => user.username === userName);
  }
}
