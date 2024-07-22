import { Controller, Get ,Param,Delete} from '@nestjs/common';
import { LeftService } from './left.service';

@Controller('left')
export class LeftController {
  constructor(private readonly leftService: LeftService) {}

  @Get()
  async findLeft() {
    return this.leftService.find();
  }

  @Get(':id')
  async findId(@Param('id') id:string){
    return this.leftService.getByID(id)
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id:string){
    return this.leftService.deleteEmployee(id)
  }

}
