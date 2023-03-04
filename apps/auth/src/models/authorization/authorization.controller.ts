import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  LoginDto,
  RegistrationDto,
  RpcValidationFilter,
} from '@template/common';
import { AuthorizationService } from './authorization.service';

@UseFilters(new RpcValidationFilter())
@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @MessagePattern('/token/add')
  async addToken(@Payload() id: number) {
    return await this.authorizationService.createUserToken(id);
  }

  @MessagePattern('/token/delete')
  async deleteToken(@Payload() id: number) {
    return await this.authorizationService.deleteUserToken(id);
  }

  @MessagePattern('/token')
  async getToken(@Payload() token: string) {
    return await this.authorizationService.getUserId(token);
  }

  @MessagePattern('/auth/login')
  async login(@Payload() dto: LoginDto) {
    return await this.authorizationService.login(dto);
  }
  @MessagePattern('/auth/registration')
  async registration(@Payload() dto: RegistrationDto) {
    return await this.authorizationService.registration(dto);
  }
}
