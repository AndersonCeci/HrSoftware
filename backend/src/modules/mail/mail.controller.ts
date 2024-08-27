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
import { template } from 'handlebars';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('template')
  async getEmailTemplate() {
    const template = await this.mailService.getTemplate();
    return template;
  }

  @Post()
  // @Roles(['hr', 'ceo'])
  sendEmail(@Body() body: { emailData: SentEmailDTO; template: string }) {
    try {
      const { emailData, template } = body;
      return this.mailService.sendEmail(template, emailData);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
