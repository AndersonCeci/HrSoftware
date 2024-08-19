import {
  ConflictException,
  Controller,
  Get,
  Query,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { google } from 'googleapis';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';

@Roles(['hr', 'ceo'])
// @UseGuards(AuthGuard, AuthorizationGuard)
@Controller('auth')
export class AuthController {
  private readonly oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  @Get('authorize')
  @Redirect()
  authorize() {
    try {
      const scopes = [process.env.GOOGLE_CLIENT_SCOPE];
      const url = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
      });
      return { url };
    } catch (error) {
      throw new ConflictException('Failed to generate authorization URL');
    }
  }

  @Get('callback')
  async callback(@Query('code') code: string) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      console.log('Access Token:', tokens.access_token);
      console.log('Refresh Token:', tokens.refresh_token);
      return 'Tokens obtained successfully!';
    } catch (error) {
      throw new ConflictException(
        'Failed to exchange authorization code for tokens',
      );
    }
  }
}
