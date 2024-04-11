import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UsersService } from './users.service';
import { SerializedUser } from './dto/SerializedUser';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    return new SerializedUser(newUser);
  }
}
