import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './config/database.config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      extraProviders: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    AuthModule,
  ],
})
export class AppModule {}
