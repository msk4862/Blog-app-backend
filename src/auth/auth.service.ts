import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UsersService } from 'src/users/users.service';
import { isPasswordMatching } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new BadRequestException('User does not exist');

    const isCorrectPassword = await isPasswordMatching(password, user.password);

    if (!isCorrectPassword)
      throw new BadRequestException('Username or password is wrong');

    const payload = { sub: email, password };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
