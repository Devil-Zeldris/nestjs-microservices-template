import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthorizationGuard, RequestInterface } from '@template/common';
import { UsersServices } from './users.services';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersServices) {}

  @UseGuards(AuthorizationGuard)
  @Get('/@me')
  async getMe(@Req() req: RequestInterface) {
    return await this.usersService.getUsers(req.userId);
  }
}
