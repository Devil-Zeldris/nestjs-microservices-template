import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  ClientProxyName,
  TcpClientsService,
} from '@template/common/tcp-clients';
import {
  AccountDto,
  LoginDto,
  RegistrationDto,
} from '@template/common/microservices';

@Injectable()
export class CoreTcpClientService {
  constructor(
    @Inject(forwardRef(() => TcpClientsService))
    private tcpClientService: TcpClientsService,
  ) {}

  private CoreTcpClient: ClientProxyName = ClientProxyName.CORE;

  public async registartion(dto: RegistrationDto) {
    return await this.tcpClientService.send<number>(
      this.CoreTcpClient,
      '/users/registartion',
      dto,
    );
  }

  public async login(dto: LoginDto) {
    return await this.tcpClientService.send<AccountDto>(
      this.CoreTcpClient,
      '/users/login',
      dto,
    );
  }

  public async getUser(id: number) {
    return await this.tcpClientService.send<AccountDto>(
      this.CoreTcpClient,
      '/users/get',
      id,
    );
  }
}
