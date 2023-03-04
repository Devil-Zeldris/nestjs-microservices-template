import { forwardRef, Inject } from '@nestjs/common';
import { CoreTcpClientService } from '@template/common';

export class UsersServices {
  constructor(
    @Inject(forwardRef(() => CoreTcpClientService))
    private readonly coreTcpClientsServices: CoreTcpClientService,
  ) {}

  public async getUsers(id: number) {
    return await this.coreTcpClientsServices.getUser(id);
  }
}
