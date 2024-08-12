import { Controller, Get, Query } from '@nestjs/common';
import { GmailApiService } from './gmail-api.service';
import { Roles } from 'src/decorators/role.decorator';

@Roles(['hr', 'ceo'])
@Controller('gmail-api')
export class GmailApiController {
  constructor(private readonly gmailService: GmailApiService) {}

  @Get('messages')
  async getMessages(
    @Query('subjectFilter') subjectFilter: string | null,
    @Query('startDate') startDate: string | null,
  ) {
    return this.gmailService.fetchAndSaveEmails(subjectFilter, startDate);
  }
}
