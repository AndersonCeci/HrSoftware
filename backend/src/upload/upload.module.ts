import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FirebaseModule } from './firebaseUpload.module';
import { FileController } from './upload.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [FileController],
  providers: [UploadService],
})
export class UploadModule {}
