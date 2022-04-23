import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.usersService.findOneEmailWithPassword(email);
      if (!user) {
         throw new BadRequestException('Invalid credentials');
      }

      const matchPassword = await bcrypt.compare(pass, user.password);
      if (!matchPassword) {
        throw new BadRequestException('Invalid credentials');
      }
      
      const { password, ...result } = user;
      return result;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
