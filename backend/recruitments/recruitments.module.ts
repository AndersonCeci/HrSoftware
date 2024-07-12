import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruitmentService } from './recruitments.service';
import { RecruimentsController } from './recruitments.controller';
import { Recruitment, RecruitmentSchema } from './schemas/recruiment.schema';


@Module( {
    imports: [
        MongooseModule.forFeature( [ {
            name: Recruitment.name,
            schema: RecruitmentSchema,
    }])
    ],
    providers: [ RecruitmentService ],
    controllers: [RecruimentsController],
} )

export class RecruimentsModule {}