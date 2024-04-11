import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return;
  }
}
