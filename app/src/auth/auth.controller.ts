import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RegisterRequestDTO } from './dto/register-request.dto';
import { UserService } from '../user/user.service';
import { UserRuntimeException } from '../user/exception/runtime/user-runtime.exception';
import { UserHttpException } from '../user/exception/http/user-http.exception';
import { HashRuntimeException } from '../hash/exception/runtime/hash-runtime.exception';
import { HashHttpException } from '../hash/exception/http/hash-http.exception';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  // @Post('login')
  // async login() {}

  @Post('register')
  async register(@Body() dto: RegisterRequestDTO) {
    try {
      return await this.userService.create(dto);
    } catch (e) {
      if (e instanceof UserRuntimeException) {
        throw new UserHttpException(e.message, HttpStatus.BAD_REQUEST);
      }
      if (e instanceof HashRuntimeException) {
        throw new HashHttpException(e.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
