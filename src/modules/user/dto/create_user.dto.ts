import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Provide an email' })
  email: string;

  @IsString({ message: 'Provide a password' })
  password: string;
}
