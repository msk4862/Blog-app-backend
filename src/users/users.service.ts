import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { LoginUserDto } from 'src/auth/dto/LoginUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const password = await encodePassword(createUserDto.password);
    const isUserExists = await this.userRepository.exists({
      where: { email: createUserDto.email },
    });

    if (isUserExists) {
      throw new HttpException('User already exists.', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.userRepository.create({ ...createUserDto, password });
    return this.userRepository.save(newUser);
  }

  findByEmail(email: LoginUserDto['email']) {
    return this.userRepository.findOne({ where: { email } });
  }
}
