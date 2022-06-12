import { RegisterPayload } from './model/register-payload';
import { RegisterResponse } from './model/register-response';
import { Observable } from 'rxjs';
import { LoginPayload } from './model/login-payload';
import { LoginResponse } from './model/login-response';

export interface AuthService {
  register(data: RegisterPayload): Observable<RegisterResponse>;
  login(data: LoginPayload): Observable<LoginResponse>;
}
