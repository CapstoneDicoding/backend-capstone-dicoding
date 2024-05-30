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

  async findCandidateIdByUserId(user_id: number) {
    return await this.dbService.candidates.findFirst({
      where: { user_id },
      select: {
        id: true,
      },
    });
  }

  async findCompanyIdByUserId(user_id: number) {
    return await this.dbService.companies.findFirst({
      where: { user_id },
      select: {
        id: true,
      },
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
    
    let extendedPayload = payload as any;
    if (user.role === 'recruiter') {
      const { id } = await this.findCompanyIdByUserId(user.id);
      extendedPayload.company_id = id;
    } else {
      const { id } = await this.findCandidateIdByUserId(user.id);
      extendedPayload.candidate_id = id;
    }

    return { access_token: this.jwtService.sign(extendedPayload), role: user.role};
  }
}
