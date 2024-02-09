import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  @ApiOperation({
    summary: 'Register a user',
    description:
      'Registers a user first in Firebase auth and then in MongoDB Atlas. If the insertion in Firebase fails, it will delete the insert in MongoDB.',
  })
  async signUp(@Body() user: CreateUserDto): Promise<GetUserDto> {
    try {
      const createdUser = await this.userService.create(user);
      return createdUser;
    } catch (err) {
      throw new BadRequestException('Error while creating a user ', {
        cause: new Error(),
        description: err.message,
      });
    }
  }
}
