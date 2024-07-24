import { Address } from "@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class  SentEmailDTO {
    @IsNotEmpty()
    sender?: string | Address;
    @IsNotEmpty()
    recepients: string | Address[];

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsString()
    name:string;

   
    @IsString()
    email:string;

    @IsOptional()
    @IsString()
    password:string

    @IsString()
    hr:string
}