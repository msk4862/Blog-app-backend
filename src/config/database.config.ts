import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ENVIRONMENT_VARIABLES } from './config.types';
import { UserEntity } from 'src/users/entities';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService<ENVIRONMENT_VARIABLES>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      username: this.config.get<string>('DATABASE_USERNAME'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
      host: this.config.get<string>('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      entities: [UserEntity],
      synchronize: true,
    };
  }
}
