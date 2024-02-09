import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class GetUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    _id: string;
}
