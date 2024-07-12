import { Controller, HttpCode, HttpStatus, NotImplementedException, Post, Get, UseGuards, Request, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./guards/passport-local.guard";
import { PasswportJwtAuthGuard } from "./guards/passport-jwt.guard";
import * as cors from 'cors';
@Controller('auth-v2')
export class PassportAuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    async login(@Request() request) {
        try{
        console.log(request.user);
        const user = request.user;
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const result = await this.authService.signIn(user);
        return result;
    } catch (error) {
        throw new UnauthorizedException('Invalid credentials');
    }
    }

    @Get('dashboard')
    @UseGuards(PasswportJwtAuthGuard)
    getUserInfo(@Request() request) {
        return request.user;
    }
   
}