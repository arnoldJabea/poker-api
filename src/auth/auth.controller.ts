import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
    // return this.authService.register(authDto.username, authDto.password);
  }
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(
      await this.authService.validateUser(body.username, body.password),
    );
  }
}
