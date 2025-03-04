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

    @Post()
    async create(@Body() body : UserDto) {
        const user = await this.userService.findByUsername(body.username);
        if (user != undefined) {
            console.log(user)
            throw new BadRequestException('Ce nom est déjà utilisé.')
        }
        this.userService.createUser(body.username, body.password)

        // await this.userService.signUp(body.email, body.password)

        // await this.ownersService.signIn(body.name, body.password)
    }

    
}
