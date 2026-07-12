import { Controller, Post, Body, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from '../../../../packages/shared-dto/src/auth.dto';
import { firstValueFrom } from 'rxjs';

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('auth.login');
    this.authClient.subscribeToResponseOf('auth.register');
    await this.authClient.connect();
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Return JWT Token' })
  async login(@Body() loginDto: LoginDto) {
    return firstValueFrom(this.authClient.send('auth.login', loginDto));
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  async register(@Body() registerDto: RegisterDto) {
    return firstValueFrom(this.authClient.send('auth.register', registerDto));
  }
}
