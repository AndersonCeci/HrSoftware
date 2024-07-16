import { Module } from '@nestjs/common';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Salary, SalarySchema } from './schema/salary.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Salary.name, schema: SalarySchema }])],
  controllers: [SalaryController],
  providers: [SalaryService]
})
export class SalaryModule {}
