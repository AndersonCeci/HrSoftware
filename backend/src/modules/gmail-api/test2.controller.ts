import {
  ConflictException,
  Controller,
  Get,
  Query,
  Redirect,
} from '@nestjs/common';
import { google } from 'googleapis';
import { UserService } from '../../users/users.service';

@Controller('auth')
export class AuthController {
  private readonly oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  constructor(private readonly userService: UserService) {}

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
      const refreshToken = tokens.refresh_token;

      if (!refreshToken) {
        throw new ConflictException('No refresh token returned');
      }

      // await this.userService.saveRefreshToken('user@example.com', refreshToken);

      return 'Tokens obtained and saved successfully!';
    } catch (error) {
      throw new ConflictException(
        'Failed to exchange authorization code for tokens',
      );
    }
  }

  @Get('check-refresh-token')
  async checkRefreshToken(@Query('email') email: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user || !user.refreshToken) {
      const url = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [process.env.GOOGLE_CLIENT_SCOPE],
      });
      return { url, message: 'No refresh token, redirecting to authorization' };
    }

    this.oauth2Client.setCredentials({ refresh_token: user.refreshToken });

    try {
      await this.oauth2Client.getAccessToken();
      return { message: 'Refresh token is valid' };
    } catch (error) {
      const url = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [process.env.GOOGLE_CLIENT_SCOPE],
      });
      return {
        url,
        message: 'Refresh token is expired, redirecting to authorization',
      };
    }
  }
}
