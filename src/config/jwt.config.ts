import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENVIRONMENT_VARIABLES } from './config.types';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService<ENVIRONMENT_VARIABLES>) {}

  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: this.config.get('JWT_SECRET'),
      signOptions: { expiresIn: '15m' },
      global: true,
    };
  }
}
