import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

type AuthInput = { username: string; password: string };
type SignInData = { _id: string; username: string};
type AuthResult = { accessToken: string; _id: string; username: string  };

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,

    ) {}

    async authenticate(input: AuthInput): Promise<AuthResult>{

        const user = await this.validateUser(input);
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.signIn(user);

    }
    async validateUser(input: AuthInput): Promise<SignInData | null>{
        const user = await this.usersService.getUserByUsername(input.username);

        if(user && user.password === input.password){
            return {
                _id: user._id.toString(),
                username: user.username
            } 
        }
        return null;
    }

    async signIn(user: SignInData): Promise<AuthResult>{
        const tokenPayload = {
            sub: user._id,
            username: user.username
        };

        const accessToken = await this.jwtService.sign(tokenPayload);

        return {
            accessToken,
            _id: user._id.toString(),
            username: user.username
        }
    }
}
