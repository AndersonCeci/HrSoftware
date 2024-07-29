import { Module } from '@nestjs/common';
import { FirebaseService } from './firebaseUpload.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}





