import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
<<<<<<< HEAD
  register(@Body() body: { username: string; password: string }) {
    return this.authService.register(body.username, body.password);
  }
=======
  async register(@Body() authDto: AuthDto) {
    console.log("📥 let's goo Received body:", authDto); 
    if (!authDto || !authDto.username || !authDto.password) {
      console.log(" ohllallalalaala❌ Missing username or password");
      return { error: 'Missing username or password' };
    }
>>>>>>> a5786ea7d81a9e6c46373d1a0558e4bb22088aea

    return this.authService.register(authDto.username, authDto.password);
  }
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(
      await this.authService.validateUser(body.username, body.password),
    );
  }
}
