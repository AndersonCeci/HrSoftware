import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export enum Role {
    Admin = 'admin',
    CEO = 'ceo',
    HR = 'hr',
    Employee = 'employee'
}

@Schema()
export class User {
    @Prop({required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);