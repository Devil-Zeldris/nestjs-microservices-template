import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthTcpClientService, LoginDto, RegistrationDto } from "@template/common";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => AuthTcpClientService))
    private readonly authTcpClientService: AuthTcpClientService,
  ) {}

  public async registration(dto: RegistrationDto) {
    return await this.authTcpClientService.registration(dto);
  }

  public async login(dto: LoginDto) {
    return await this.authTcpClientService.login(dto);
  }
}
