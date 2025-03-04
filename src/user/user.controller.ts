import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users') 
export class UserController {
  
  @Get('profile') 
  @UseGuards(JwtAuthGuard) 
  getProfile(@Request() req) {
    console.log(" yesss go User data from JWT:", req.user);
    return req.user; 
    
  }
}
