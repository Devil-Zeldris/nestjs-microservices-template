import { IsEmail, IsString, Max, Min } from 'class-validator';

export class RegistrationDto {
  @IsString({ message: 'Add email' })
  @IsEmail({}, { message: `Is not a email` })
  readonly email: string;
  @IsString({ message: 'Add username' })
  readonly username: string;

  @IsString({ message: 'Add password' })
  @Min(8, { message: 'Min length 8 words in password' })
  @Max(24, { message: 'Max length 24 words in password' })
  readonly password: string;

  @IsString({ message: 'Add password' })
  @Min(8, { message: 'Min length 8 words in password' })
  @Max(24, { message: 'Max length 24 words in password' })
  readonly confirmPassword: string;
}
