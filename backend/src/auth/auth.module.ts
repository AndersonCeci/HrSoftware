import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PassportAuthController } from './passport-auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    
  ],
  controllers: [PassportAuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
})
export class AuthModule {}
