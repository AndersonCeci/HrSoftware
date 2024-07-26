import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruitmentService } from './recruitments.service';
import { RecruimentsController } from './recruitments.controller';
import { Recruitment, RecruitmentSchema } from './schemas/recruiment.schema';
import { UploadModule } from 'src/upload/upload.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Recruitment.name,
        schema: RecruitmentSchema,
      },
    ]),
    UploadModule
  ],
  providers: [RecruitmentService],
  controllers: [RecruimentsController],
})
export class RecruimentsModule {}