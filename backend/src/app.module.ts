<<<<<<< HEAD
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config/dist/config.module';

import { LoggingMiddleware } from './middlewares/logging.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SalaryModule } from './modules/salary/salary.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DBURL),
    UserModule,
    AuthModule,
    SalaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
=======
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RecruimentsModule } from './recruitments/recruitments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/admin'),
   UsersModule,
    AuthModule,
    RecruimentsModule,
  ],
  controllers: [],
  providers: [AuthService],
>>>>>>> main
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggingMiddleware).forRoutes("*")
  }
}
