import { Module } from '@nestjs/common';
import { DayoffService } from './dayoff.service';
import { DayoffController } from './dayoff.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DayOff, DayOffSchema } from './schema/dayoff.schema';
import { EmployeeModule } from 'src/employee/employe.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DayOff.name, schema: DayOffSchema }]),
    EmployeeModule
  ],
  providers: [DayoffService],
  controllers: [DayoffController]
})
export class DayoffModule {}
