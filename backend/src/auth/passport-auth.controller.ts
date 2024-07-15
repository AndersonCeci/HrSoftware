import { Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Request, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./guards/passport-local.guard";
import { PassportJwtAuthGuard } from "./guards/passport-jwt.guard";
@Controller('')
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

    // *** TESTING PURPOSES LEAVE FOR NOW  MIGHT NEED IT LEATER ***

    // @Get('dashboard')
    // @UseGuards(PassportJwtAuthGuard)
    // getUserInfo(@Request() request) {
    //     return request.user;
    // }

    
   
    @Get('verify')
    @UseGuards(PassportJwtAuthGuard)
    async verifyToken(@Request() request) {
        try {
            const token = request.headers.authorization.split(' ')[1];
            const user = await this.authService.verifyToken(token);
            return { user };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}