import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
      console.log("here");
      const user = await this.userService.findByName(username);
      console.log(user);
      if(user && user.password === password){
        const {password, ...result} = user;
        return result;
      }
      return null;
    }

    async login(username: string, password: string) {
      console.log('in log in');
      const user = await this.validateUser(username,password);
      const payload = {id:user.id, name: user.name, password: user.password, isAdmin: user.isAdmin};
      return {
        access_token: this.jwtService.sign(payload, {expiresIn: '30m'}),
      };
    }
}