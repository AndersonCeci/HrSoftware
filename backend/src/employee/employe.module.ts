import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './schema/employe.schema';
import { EmployeeController } from './employe.controller';
import { EmployeeService } from './employe.service';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { PromotionModule } from 'src/promotion/promotion.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
    UsersModule,
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
