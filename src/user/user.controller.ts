import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService : UserService) {

    }

    @Post()
    async create(@Body() body : UserDto) {
        const user = await this.userService.findOne(body.email);
        if (user != undefined) {
            console.log(user)
            throw new BadRequestException('Email déjà utilisé. Veuillez saisir une autre adresse mail.')
        }
        this.userService.create(body)

        await this.userService.signUp(body.email, body.password)

        // await this.ownersService.signIn(body.name, body.password)
    }
    
}
