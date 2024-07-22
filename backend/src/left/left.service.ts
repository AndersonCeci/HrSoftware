import { Injectable, Inject } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employe.service';
import { Employee } from 'src/employee/schema/employe.schema';

@Injectable()
export class LeftService {
  constructor(
    @Inject(EmployeeService)
    private readonly employeeService: EmployeeService,
  ) {}

  find(): Promise<Employee[]> {
    return this.employeeService.findLeft();
  }

  getByID(id: string): Promise<Employee | null> {
    return this.employeeService.findOne(id);
  }

  deleteEmployee(id:string) : Promise<Employee | null>{
     return this.employeeService.delete(id)
  }
 
}
