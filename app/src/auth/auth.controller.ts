import {
  Request,
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RegisterRequestDTO } from './dto/register-request.dto';
import { UserService } from '../user/user.service';
import { UserRuntimeException } from '../user/exception/runtime/user-runtime.exception';
import { UserHttpException } from '../user/exception/http/user-http.exception';
import { HashRuntimeException } from '../hash/exception/runtime/hash-runtime.exception';
import { HashHttpException } from '../hash/exception/http/hash-http.exception';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return await this.authService.login(request.user);
  }

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
