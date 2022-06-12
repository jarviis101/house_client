import { Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RegisterResponse } from './model/register-response';
import { LoginResponse } from './model/login-response';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authService: AuthService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit(): any {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  @Post('register')
  register(): Observable<RegisterResponse> {
    return this.authService.register({
      phone: '+380965235852',
      email: 'example@mail.ru',
      name: 'Lex',
      password: 'pass',
    });
  }

  @Post('login')
  login(): Observable<LoginResponse> {
    return this.authService.login({
      phone: '+380965235852',
      password: 'pass',
    });
  }
}
