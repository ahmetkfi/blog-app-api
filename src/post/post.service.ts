import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { PostDto } from "./dto/post.dto";
import {Request,Response} from 'express'
import { JwtService } from "@nestjs/jwt";
import { stringify } from "querystring";
import { jwtSecret } from "src/utils/constant";
import * as jwtoken from 'jsonwebtoken';

@Injectable()
export class PostService{
    constructor(private prisma:PrismaService,private jwt:JwtService){}
    async getAllPost(){
        const posts=await this.prisma.post.findMany();
        if(!posts){
            throw new NotFoundException();
        }
        return posts;
    }
    async createPost(dto:PostDto,req:Request,res:Response){
        const {post_title,post_image,post_content}=dto;
        const payload=await this.decodeToken(req.cookies.token);
        if(!payload){
            throw new BadRequestException();
        }
        await this.prisma.post.create({
            data:{
                post_title,
                post_image,
                post_content,
                authorId:payload.id,
            }
        });
        res.send(`post created ---> author: ${payload.username}`);
    }
    async getUserPost(req:Request,res:Response){
        const payload=await this.decodeToken(req.cookies.token);
        const userPosts= await this.prisma.post.findMany({where:{authorId:payload.id}})
        if(!userPosts){
            throw new NotFoundException();
        }
        res.send(userPosts);
    }

    async decodeToken(token:string){
        const decodedToken= JSON.stringify(this.jwt.decode(token));
        return JSON.parse(decodedToken);
    }
}