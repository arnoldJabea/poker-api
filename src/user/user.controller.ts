import { Controller, Get, UseGuards, Request } from '@nestjs/common';
<<<<<<< HEAD
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: { user: User }): User {
    return req.user;
=======
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users') 
export class UserController {
  
  @Get('profile') 
  @UseGuards(JwtAuthGuard) 
  getProfile(@Request() req) {
    console.log(" yesss go User data from JWT:", req.user);
    return req.user; 
    
>>>>>>> a5786ea7d81a9e6c46373d1a0558e4bb22088aea
  }
}
