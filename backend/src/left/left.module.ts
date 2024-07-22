import { Module } from '@nestjs/common';
import { LeftController } from './left.controller';
import { EmployeeModule } from 'src/employee/employe.module';
import { LeftService } from './left.service';
import { EmployeeService } from 'src/employee/employe.service';

@Module({
  imports: [EmployeeModule],
  controllers: [LeftController],
  providers: [LeftService],
})
export class LeftModule {}
