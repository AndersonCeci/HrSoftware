import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDTO } from './authDTO/auth.dto';

@Controller('auth')
export class AuthController {

@Post()
login(@Body() authPayload:AuthPayloadDTO){

}




}
