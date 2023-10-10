import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaService } from "prisma/prisma.service";
import { PrismaModule } from "prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    providers:[AuthService],
    controllers:[AuthController],
    imports:[PrismaModule,JwtModule]
    
})
export class AuthModule{}