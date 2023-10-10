import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "prisma/prisma.service";
import { JwtStrategy } from "src/auth/jwt.strategy";

@Module({
    controllers:[PostController],
    providers:[PostService,JwtService,PrismaService,JwtStrategy],
})
export class PostModule{}