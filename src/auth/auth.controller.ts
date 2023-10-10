import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Request, Response } from "express";
import { SignInDto } from "./dto/signin.dto";

@Controller('auth')
export class AuthController{
    constructor(private authservice:AuthService){}
    @Post('signup')
    signup(@Body() dto:AuthDto){
        return this.authservice.signup(dto);
    }
    @Post('signin')
    signin(@Body() dto:SignInDto,@Req() req:Request,@Res() res:Response){
        return this.authservice.signin(dto,req,res);
    }
    @Post('signout')
    signout(@Req() req:Request,@Res() res:Response){
        return this.authservice.signout(req,res);
    }
    
}