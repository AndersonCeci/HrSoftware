import { Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Request, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./guards/passport-local.guard";
import { PasswportJwtAuthGuard } from "./guards/passport-jwt.guard";
@Controller('auth')
export class PassportAuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    async login(@Request() request) {
        try{
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