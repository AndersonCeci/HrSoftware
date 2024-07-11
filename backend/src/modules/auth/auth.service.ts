import { Injectable } from '@nestjs/common';
import { AuthPayloadDTO } from './authDTO/auth.dto';

@Injectable()
export class AuthService {
  validateUser({username,password}:AuthPayloadDTO){


  }

}
