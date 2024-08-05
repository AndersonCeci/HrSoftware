import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, Role } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const { employID, username, password, role, email } = createUserDto;
    const loginRole: Role =
      role === Role.Dev || role === Role.ProjectManager ? Role.Employee : role;

    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({
      employID,
      username,
      password: hashedPassword,
      role,
      email,
      loginRole,
    });

    const savedUser = await newUser.save();
    console.log('Saved User:', savedUser);
    return savedUser;
  }

  async getUsers() {
    return this.userModel.find();
  }

  async getUserByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async updatePassword(
    username: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await this.validatePassword(
      user.password,
      oldPassword,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Old password is incorrect');
    }
    const isNewPasswordValid = await this.validatePassword(
      user.password,
      newPassword,
    );
    if (isNewPasswordValid) {
      throw new BadRequestException(
        'The new password can not be the same as the old password',
      );
    }

    user.password = await this.hashPassword(newPassword);
    await user.save();
  }

  async validatePassword(
    storedPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedPassword);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userModel.findOneAndDelete({ id }).exec();
  }

  async softDeleteUserById(id: string): Promise<Event> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return this.userModel.findByIdAndUpdate(
      id,
      { isDeleted: true, deleteDate: currentDate },
      { new: true },
    );
  }
  async deleteUserByEmployID(employID: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(employID).exec();
  }
}
