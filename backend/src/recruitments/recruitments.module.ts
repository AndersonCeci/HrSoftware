import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruitmentService } from './recruitments.service';
import { RecruitmentsController } from './recruitments.controller';
import { Recruitment, RecruitmentSchema } from './schemas/recruitment.schema';
import { UploadModule } from 'src/upload/upload.module';
import { EventsModule } from 'src/modules/events/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Recruitment.name,
        schema: RecruitmentSchema,
      },
    ]),
    UploadModule,
    EventsModule,
  ],
  providers: [RecruitmentService],
  controllers: [RecruitmentsController],
  exports: [RecruitmentService],
})
export class RecruitmentsModule {}
