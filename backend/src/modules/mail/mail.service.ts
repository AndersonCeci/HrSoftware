import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SentEmailDTO } from './dto/sendEmail.dto';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class MailService {
  constructor(private readonly mailerservice: MailerService) {}
  async getTemplate() {
    const templatePath = join(
      process.cwd(),
      'modules',
      'mail',
      'templates',
      'welcome-template.hbs',
    );

    console.log('Template path:', templatePath);
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    return templateContent;
  }

  async sendEmail(dto: SentEmailDTO) {
    try {
      const result = await this.mailerservice.sendMail({
        from: dto.sender,
        to: dto.recepients,
        subject: dto.subject,
        template: 'welcome-template',
        context: {
          title: 'Welcome',
          name: dto.name,
          email: dto.email,
          password: dto.password,
          hr: dto.hr,
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/hrsoftware-75457.appspot.com/o/loginlogo.png?alt=media&token=22a63636-b29c-4ac6-a0b9-2ab66880564b',
        },
        text: dto.text,
      });
      return result;
    } catch (error) {
      console.error('Email sending failed:', error);

      if (error.response) {
        const errorMessage = error.response.body
          ? error.response.body
          : 'An unknown error occurred';
        console.error('Mailjet Error Details:', errorMessage);

        throw new BadRequestException(`Mailjet Error: ${errorMessage}`);
      }

      throw new InternalServerErrorException(
        'Failed to send email. Please try again later.',
      );
    }
  }
}
