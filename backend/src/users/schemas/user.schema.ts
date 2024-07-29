import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as muv from 'mongoose-unique-validator';


export enum Role {
    Admin = 'admin',
    CEO = 'ceo',
    HR = 'hr',
    Employee = 'employee',
    Dev = 'dev',
    ProjectManager = 'projectManager',
}

@Schema({ timestamps: true})
export class User {
    @Prop({required: true , unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    role: Role;

    @Prop()
    loginRole: Role;
}

 const UserSchema = SchemaFactory.createForClass(User);
 UserSchema.plugin(muv ,{message:"Username must be unique"});
 export {UserSchema};