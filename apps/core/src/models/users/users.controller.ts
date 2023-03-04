import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto, RegistrationDto } from '@template/common';
import { UsersServices } from './users.services';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersServices) {}

  @MessagePattern('/users/registration')
  async userRegistration(@Payload() dto: RegistrationDto) {
    return await this.usersService.registration(dto);
  }

  @MessagePattern('/users/login')
  async userLogin(@Payload() dto: LoginDto) {
    return await this.usersService.login(dto);
  }

  @MessagePattern('/users/get')
  async getUser(@Payload() id: number) {
    return await this.usersService.getUser(id);
  }
}
