import { google } from 'googleapis';
import { RecruitmentService } from 'src/recruitments/recruitments.service';
import { CreateRecruitmentDto, RecruitmentWithFileDto } from 'src/recruitments/dto/Recruitments.dto';
import { RecruitmentStage } from 'src/recruitments/schemas/recruitment.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GmailApiService {
  private readonly oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  constructor(private recruitmentService: RecruitmentService) {
    this.oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  private async getGmailService() {
    const { token } = await this.oauth2Client.getAccessToken();
    this.oauth2Client.setCredentials({
      access_token: token,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      scope: process.env.GOOGLE_CLIENT_SCOPE,
      token_type: 'Bearer',
    });

    return google.gmail({ version: 'v1', auth: this.oauth2Client });
  }

  public async fetchAndSaveEmails(
    subjectFilter: string | null = null,
    startDate: string | null = null,
  ): Promise<RecruitmentWithFileDto[]> {
    try {
      const gmail = await this.getGmailService();

      let query = '';
      if (subjectFilter) {
        query += `subject:${subjectFilter} `;
      }
      if (startDate) {
        query += `after:${startDate}`;
      }

      const response = await gmail.users.messages.list({
        userId: 'me',
        q: query.trim(),
        maxResults: 10,
        labelIds: ['INBOX'],
      });

      const messages = response.data.messages || [];
      const recruitments: RecruitmentWithFileDto[] = [];

      for (const message of messages) {
        const msg = await gmail.users.messages.get({
          userId: 'me',
          id: message.id!,
        });

        const emailData = msg.data;

        const fromHeader = emailData.payload?.headers?.find((h) => h.name === 'From')?.value;
        const [name, email] = fromHeader?.match(/(.*) <(.*)>/)?.slice(1, 3) || [];
        const [surname, firstName] = name?.split(' ').reverse() || [];

        const createRecruitmentDto: RecruitmentWithFileDto = {
          name: firstName,
          surname: surname,
          email: email,
          position: 'Unknown',
          stage: RecruitmentStage.Applied,
          submittedDate: new Date(emailData.payload?.headers?.find((h) => h.name === 'Date')?.value || new Date()),
          cv: '',
          phoneNumber: null,
          isDeleted: false,
          deleteDate: null,
        };

        let recruitmentWithFile = { ...createRecruitmentDto };

        const parts = emailData.payload?.parts || [];
        for (const part of parts) {
          if (part.filename && part.body?.attachmentId) {
            const attachment = await gmail.users.messages.attachments.get({
              userId: 'me',
              messageId: message.id!,
              id: part.body.attachmentId,
            });

            const attachmentData = attachment.data.data;
            const dangerousExtensions = ['exe', 'bin', 'bat', 'cmd'];
            const fileExtension = part.filename.split('.').pop()?.toLowerCase();

            if (dangerousExtensions.includes(fileExtension!)) {
              console.warn(`Dangerous file detected: ${part.filename}`);
            } else {
              const cvExtensions = ['pdf', 'doc', 'docx'];
              if (cvExtensions.includes(fileExtension!)) {
                recruitmentWithFile = {
                  ...recruitmentWithFile,
                  file: {
                    filename: part.filename,
                    data: attachmentData,
                  },
                };
                break;
              }
            }
          }
        }

        recruitments.push(recruitmentWithFile);
      }
      return recruitments;
    } catch (error) {
      console.error('Error fetching and saving emails:', error);
      throw error;
    }
  }
}
