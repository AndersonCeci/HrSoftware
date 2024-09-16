import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SentEmailDTO } from './dto/sendEmail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  sendEmail(@Body() dto: SentEmailDTO) {
    try {
      if (dto.template === 'interview-template') {
        console.log('interview-template');
        console.log(dto);
        return this.mailService.sendInterviewEmail(dto);
      } else {
        console.log('else');
        return this.mailService.sendEmail(dto);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
