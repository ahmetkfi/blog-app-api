import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { AuthDto } from "./dto/auth.dto";
import { PrismaService } from "prisma/prisma.service";
import {Request,Response} from 'express';
import { JwtService } from "@nestjs/jwt/dist";
import { jwtSecret } from "src/utils/constant";
import { SignInDto } from "./dto/signin.dto";
@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService,private jwt:JwtService){}
    async signup(dto:AuthDto){
        const {e_mail,user_name,password}=dto;
        const founduser=await this.prisma.user.findUnique({where:{e_mail}});
        if(founduser){
            throw new BadRequestException();
        }
        const hashedPass:string=await this.hashPassword(password);
        await this.prisma.user.create({
            data:{
                e_mail,
                user_name,
                hashed_password:hashedPass,
            }
        })
        return  `sign up succes ${e_mail}`
    }
    async signin(dto:SignInDto,req:Request,res:Response){
        const {user_name,password}=dto;
        const founduser= await this.prisma.user.findUnique({where:{user_name}});
        if(!founduser){
            throw new BadRequestException('Wrong crediantls');
        }
        const isMatch= await bcrypt.compare(password,founduser.hashed_password);
        if(!isMatch){
            throw new BadRequestException('Wrong Password');
        }
        const token= await this.signToken({
            id:founduser.id,
            email:founduser.e_mail,
            username:founduser.user_name,
        });
        if(!token){
            throw new ForbiddenException();
        }
        res.cookie('token',token);
        return res.send({
            message:'Logged in succes please check cookies'
        });
    }
    async signout(req:Request,res:Response){
        res.clearCookie('token');
        return res.send({
            message:'sign out was succes'
        })
    }

    async hashPassword(password:string){
        const saltOrRounds=10;
        const hashPassword= await bcrypt.hash(password,saltOrRounds);
        return hashPassword;
    }
    async signToken(args:{id:string,email:string,username:string}){
        const payload=args;
        return this.jwt.signAsync(payload,{secret:jwtSecret});
    
    }
}