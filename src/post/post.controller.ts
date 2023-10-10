import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostDto } from "./dto/post.dto";
import {Request,Response} from 'express'
import { JwtAuthGuard } from "src/auth/jwt.guard";

@Controller('post')
export class PostController{
    constructor(private postservice:PostService){}
    @Get()
    getAllPost(){
        return this.postservice.getAllPost();
    }

    @UseGuards(JwtAuthGuard)
    @Get('myposts')
    getMyPosts(@Req() req:Request,@Res() res:Response){
        return this.postservice.getUserPost(req,res);
    }

    
    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(@Body() dto:PostDto,@Req() req:Request,@Res() res:Response){
        return this.postservice.createPost(dto,req,res);
    }

}