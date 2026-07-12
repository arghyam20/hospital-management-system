import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { LoginDto, RegisterDto } from '../../../../packages/shared-dto/src/auth.dto';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id, roleId: user.roleId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await prisma.user.findUnique({ where: { email: registerDto.email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    // Assign a default role - for simplicity we just create a User role if none exists
    let defaultRole = await prisma.role.findFirst({ where: { name: 'USER' }});
    if(!defaultRole) {
       defaultRole = await prisma.role.create({ data: { name: 'USER' } });
    }

    const user = await prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        name: registerDto.name,
        roleId: defaultRole.id
      },
    });

    const { password, ...result } = user;
    return result;
  }
}
