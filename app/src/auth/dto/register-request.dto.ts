import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public phone: string;

  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public password: string;
}
