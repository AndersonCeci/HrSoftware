import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hrsoftware'),
    UsersModule,
    AuthModule
    
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
