import { ObjectId, Types } from 'mongoose';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { Role } from 'src/users/schemas/user.schema';

type AuthInput = { email: string; password: string };
type SignInData = {
  _id: string;
  username: string;
  role: Role;
  loginRole: Role;
  employID: Types.ObjectId;
  email: string;
};
type AuthResult = {
  accessToken: string;
  _id: string;
  username: string;
  role: Role;
  loginRole: Role;
  employID: Types.ObjectId;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.getUserByEmail(input.email);
    if (
      user &&
      (await this.usersService.validatePassword(user.password, input.password))
    ) {
      return {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
        loginRole: user.loginRole,
        employID: user.employID,
        email: user.email,
      };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user._id,
      username: user.username,
      role: user.role,
      loginRole: user.loginRole,
    };

    const accessToken = await this.jwtService.sign(tokenPayload);

    return {
      accessToken,
      _id: user._id.toString(),
      username: user.username,
      role: user.role,
      loginRole: user.loginRole,
      employID: user.employID,
      email: user.email,
    };
  }

  async verifyToken(token: string): Promise<SignInData | null> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.getUserByEmail(decoded.email);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      return {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
        loginRole: user.loginRole,
        employID: user.employID,
        email: user.email,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
