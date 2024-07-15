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
})
export class AppModule {}
