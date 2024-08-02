import { Body, Controller ,Post,Get,Param,Delete,HttpException,Patch} from '@nestjs/common';
import { DayoffService } from './dayoff.service';
import { CreateDayOffDto } from './dto/CreateDayOff.dto';
import mongoose from 'mongoose';
import { UpdateDayOffDto } from './dto/UpdateDayOff.dto';


@Controller('dayoff')
export class DayoffController {
    constructor(private readonly dayoffService:DayoffService){}


    @Post()
    create(@Body() createDayOffDto:CreateDayOffDto){
       return this.dayoffService.createDayOff(createDayOffDto);
    }

    @Get()
    find(){
        return this.dayoffService.findAll()
    }

    @Delete(':id/soft-delete')
     async deleteByName(@Param('id') id: string) {
    const result = await this.dayoffService.softDeleteDayOffById(id);
    return result;
  }

  @Patch(':id/approve')
  async approve(@Param('id') id: string) {
    const result = await this.dayoffService.approved(id);
    if (!result) throw new HttpException('Day off not found', 404);
    return result;
  }


  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateDayOffDto: UpdateDayOffDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);
    return this.dayoffService.updateAsset(id, updateDayOffDto);
  }
}
