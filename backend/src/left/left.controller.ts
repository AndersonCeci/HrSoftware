import { Controller, Get ,Param,Delete, Post} from '@nestjs/common';
import { LeftService } from './left.service';

@Controller('left')
export class LeftController {
  constructor(private readonly leftService: LeftService) {}

  @Get()
  async findAll() {
    return this.leftService.findAll();
  }

  @Get(':id')
  async findId(@Param('id') id:string){
    return this.leftService.getByID(id)
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id:string){
    return this.leftService.deleteEmployee(id)
  }

  @Post('copy/:id')
  async copyEmployeeData(@Param('id') id: string){
    return await this.leftService.copyEmployeeData(id)
  }

}
