import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private dbService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findByUsername(username: string) {
    return await this.dbService.users.findUnique({
      where: { username },
    });
  }

  async validateUser(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (user && (await compare(password, user.password))) {
      const { username, password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      id: user.id,
      fullname: user.fullname,
      role: user.role,
    };

    return { access_token: this.jwtService.sign(payload), role: user.role };
  }
}
