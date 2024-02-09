import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { AuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserCredential } from 'firebase/auth';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    @Post('/login')
    @ApiOperation({
        summary: 'Login a user with Firebase',
        description: 'This endpoint requires that the credentials (email and password) already exist in the Firebase Auth database. If the endpoint succeeds, it will return the user credentials.'
      })
    async login(@Body() authDto: AuthDto) : Promise<UserCredential>{
        try {
            return await this.authService.login(authDto)
        } catch (error) {
            throw new InternalServerErrorException('Error while logging the user',{ cause: new Error(), description: error.message });
        }
    }
    @Post('/logout')
    @ApiOperation({
        summary: 'Logout the current user',
        description: 'This endpoint requires that the user is already logged in. If the endpoint succeeds, it will return a string'
      })
    async logout() : Promise<string>{
        try {
            const response = await this.authService.logout()
            return response
        } catch (error) {
            throw new InternalServerErrorException('Error while logging out',{ cause: new Error(), description: error.message });
        }
    }
}
