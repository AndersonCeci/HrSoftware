import {IsString,IsNotEmpty,IsDateString,} from 'class-validator';
  
  export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    eventName:string;
    
    @IsString()
    eventDescription?:string;
    
    @IsDateString()
    eventDate:Date;

    eventStartTime:string;

    eventEndTime:string;

    location?:string;

    image:string;
}
  