import { IsNotEmpty,IsString,IsEmail,Length } from "class-validator";
export class AuthDto{

    @IsEmail()
    public e_mail:string;

    @IsString()
    @IsNotEmpty()
    @Length(4,14,{message:'Username has to be at beetween 4 and 14 chars'})
    public user_name:string;

    @IsNotEmpty()
    @IsString()
    @Length(3,20,{message:'Password has to be at between 3 and 20 chars'})
    public password:string;
}