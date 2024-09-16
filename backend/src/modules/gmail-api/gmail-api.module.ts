import { Module } from '@nestjs/common';
import { GmailApiService } from './gmail-api.service';
import { GmailApiController } from './gmail-api.controller';
import { AuthController } from './test2.controller';
import { UploadModule } from 'src/upload/upload.module';
import { RecruitmentsModule } from 'src/recruitments/recruitments.module';
import { SchedulerModule } from 'src/schedule/scheduler.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [RecruitmentsModule, UploadModule, SchedulerModule, UsersModule],
  providers: [GmailApiService],
  controllers: [GmailApiController, AuthController],
})
export class GmailApiModule {}
