import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { HashService } from '../hash/hash.service';

@Module({
  providers: [UserService, PrismaService, HashService],
  exports: [UserService],
})
export class UserModule {}
