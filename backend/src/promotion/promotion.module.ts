import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromotionService } from './promotion.service';
import { Promotion, PromotionSchema } from './schema/promotion.schema';
import { PromotionController } from './promotion.controller';
import { EmployeeModule } from 'src/employee/employe.module';
import { Employee, EmployeeSchema } from 'src/employee/schema/employe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Promotion.name,
        schema: PromotionSchema,
      },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
    EmployeeModule,
  ],
  providers: [PromotionService],
  controllers: [PromotionController],
})
export class PromotionModule {}
