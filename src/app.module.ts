import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule,PrismaModule,PostModule],
})
export class AppModule {}
