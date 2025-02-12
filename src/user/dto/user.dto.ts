import { IsNumber, IsString, Length } from "class-validator";

export class UserDto {
    @IsString({always: true})
    name: string

    @IsString({always: true})
    password: string

    @IsString({always: true})
    email: string
}