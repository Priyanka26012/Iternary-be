// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
        console.log(user,"userr>>>",pass)
      if (user && await this.usersService.validatePassword(pass, user.password)) {
        console.log(this.usersService.validatePassword(pass, user.password),"Password")
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

async login(user: any) {
  const payload = { username: user.username, sub: user._id };
  return {
    access_token: this.jwtService.sign(payload),
  };
}
}
