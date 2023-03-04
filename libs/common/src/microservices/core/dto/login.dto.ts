import { IsString, Max, Min } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Enter username' })
  readonly username: string;
  @IsString({ message: 'Add password' })
  @Min(8, { message: 'Min length 8 words in password' })
  @Max(24, { message: 'Max length 24 words in password' })
  readonly password: string;
}
