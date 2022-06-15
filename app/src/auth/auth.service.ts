import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HashService } from '../hash/hash.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from './dto/user.dto';
import { UserWithProfile } from '../prisma/types';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hash: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDTO | null> {
    const user: UserWithProfile = await this.userService.getUserByEmail(email);

    if (user && (await this.hash.compare(password, user.password))) {
      return new UserDTO(
        user.id,
        user.phone,
        user.profile.name,
        user.profile.email,
      );
    }
    return null;
  }

  async login(user: UserDTO) {
    const payload: JwtPayload = { id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
