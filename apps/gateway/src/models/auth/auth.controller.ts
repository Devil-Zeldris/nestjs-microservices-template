import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegistrationDto } from '@template/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registartion(@Body() dto: RegistrationDto) {
    return await this.authService.registration(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
