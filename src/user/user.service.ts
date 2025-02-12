import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import * as bcrypt from 'bcrypt';

const scrypt = promisify(_scrypt)

@Injectable()
export class UserService {
    userService: any;
    usersService: any;
    constructor(@InjectRepository(User) private repo : Repository<User>) {}

    create(users : any) {
        let user = this.repo.create(users);
        this.repo.save(user);
    }
    async findOne(email: string){
        return await this.repo.findOneBy({email: email})
    }

    async signUp(email: string, password: string) {
        //const saltOrRounds = 10;
        
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        console.log(hash)

        //const salt = randomBytes(8).toString('hex')
        //const hash = (await scrypt(password, salt, 32)) as Buffer
        //const salted_and_hashed_password = salt + '.' + hash.toString('hex')
        const user = this.userService.create(email, hash);
        return user
    }

    async signIn(name: string, password: string): Promise<{access_token: string}> {
        const user = await this.usersService.findOne(name);
        if (user == undefined ) {
          // username does not exist
          throw new UnauthorizedException();
        } else {
          const [salt, hashed_password] = user.password.split('.')
          const hash = (await scrypt(password, salt, 32)) as Buffer
          const result = hash.toString('hex')
          if(result != hashed_password){
            // passwords to not match
            throw new UnauthorizedException();
          }
        }
        return user;
    }
}
