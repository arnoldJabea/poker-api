import { IsNumber, IsString, Length } from "class-validator";

export class UserDto {
    @IsString({always: true})
    username: string

    @IsString({always: true})
    password: string

    @IsNumber()
    balance: string
}