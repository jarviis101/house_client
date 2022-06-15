import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { RegisterRequestDTO } from '../auth/dto/register-request.dto';
import { HashService } from '../hash/hash.service';
import { Prisma } from '@prisma/client';
import { Codes } from '../prisma/codes.enum';
import { HashRuntimeException } from '../hash/exception/runtime/hash-runtime.exception';
import { UserRuntimeException } from './exception/runtime/user-runtime.exception';
import { UserWithProfile } from '../prisma/types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private hash: HashService) {}

  async getUserByEmail(email: string): Promise<UserWithProfile | null> {
    return this.prisma.user.findFirst({
      where: {
        profile: {
          email,
        },
      },
      include: {
        profile: true,
      },
    });
  }

  async create(dto: RegisterRequestDTO): Promise<User | string> {
    try {
      return await this.prisma.user.create({
        data: {
          phone: dto.phone,
          password: await this.hash.hash(dto.password),
          profile: {
            create: {
              email: dto.email,
              name: dto.name,
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === Codes.NotUnique) {
          throw new UserRuntimeException('Email must be unique');
        }
      }

      if (e instanceof HashRuntimeException) {
        throw new HashRuntimeException(e.message);
      }
    }
  }
}
