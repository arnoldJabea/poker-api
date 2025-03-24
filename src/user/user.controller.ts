import { Controller, Get, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users') 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile') 
  @UseGuards(JwtAuthGuard) 
  getProfile(@Request() req: any) { 

    console.log("yes !!!User data from JWT:", req.user);
    return req.user;
  }

  @Get(':id')  
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
