import { BadRequestException, Body, Controller, Get, Param, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { randomBytes, scrypt } from 'crypto';

@Controller('user')
export class UserController {
    constructor(private userService : UserService) {

    }

    @Get()
    findAll(): string {
        return 'Cette action est censé retourné tous les utilisateurs';
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `Propriété numéro #${id}`;
    }

}
