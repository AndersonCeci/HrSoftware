import {IsString,IsNumber,IsNotEmpty,IsDate,IsOptional,IsDateString,} from 'class-validator';
  
  export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    eventName:string;
    
    @IsString()
    eventDescription?:string;
 
    eventDate:string;

    eventStartDate:string;

    eventEndTime:string;

    location?:string;

    image:string;
}
  