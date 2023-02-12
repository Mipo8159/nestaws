import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Provide an email' })
  email: string;

  @IsString({ message: 'Provide a password' })
  password: string;
}
