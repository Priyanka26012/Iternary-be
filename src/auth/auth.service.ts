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

    if (user && await this.usersService.validatePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: any) {
    const user = await this.usersService.findOne(username);
    const payload = { username: username, userId: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
