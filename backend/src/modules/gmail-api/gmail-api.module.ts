import { Module } from '@nestjs/common';
import { GmailApiService } from './gmail-api.service';
import { GmailApiController } from './gmail-api.controller';
import { AuthController } from './test2.controller';
import { UploadModule } from 'src/upload/upload.module';
import { RecruitmentsModule } from 'src/recruitments/recruitments.module';

@Module({
  imports: [RecruitmentsModule, UploadModule],
  providers: [GmailApiService],
  controllers: [GmailApiController, AuthController],
})
export class GmailApiModule {}
