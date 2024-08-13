import {IsEnum, IsOptional, IsString } from "class-validator";
import { InventoryStatus } from "../schemas/Inventory.schema";


export class AssignEmployeeDto {
  @IsString()
  employeeID?: string;

  @IsString()
  assignDate?: string;

  @IsEnum(InventoryStatus)
  @IsOptional()
  status: InventoryStatus.Assigned;
}
