import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../hash/hash.service';

@Module({
  providers: [AuthService, UserService, PrismaService, HashService],
  controllers: [AuthController],
})
export class AuthModule {}
