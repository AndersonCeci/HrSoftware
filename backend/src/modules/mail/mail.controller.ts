import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SentEmailDTO } from './dto/sendEmail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('template')
  async getEmailTemplate() {
    const template = await this.mailService.getTemplate();
    return template;
  }

  @Post()
  sendEmail(@Body() dto: SentEmailDTO) {
    try {
      console.log('here', dto);
      return this.mailService.sendEmail(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
