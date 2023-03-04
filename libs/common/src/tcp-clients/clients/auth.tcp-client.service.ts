import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ClientProxyName } from '../tcp-clients.interfaces';
import { TcpClientsService } from '../tcp-clients.service';
import { LoginDto, RegistrationDto } from '@template/common/microservices';

@Injectable()
export class AuthTcpClientService {
  constructor(
    @Inject(forwardRef(() => TcpClientsService))
    private tcpClientService: TcpClientsService,
  ) {}

  private AuthTcpClient: ClientProxyName = ClientProxyName.AUTH;
  public async createUserToken(id: number) {
    return await this.tcpClientService.send<string>(
      this.AuthTcpClient,
      '/token/add',
      id,
    );
  }

  public async revokeUserToken(id: number) {
    return await this.tcpClientService.send<void>(
      this.AuthTcpClient,
      '/token/delete',
      id,
    );
  }

  public async getUserId(token: string) {
    return await this.tcpClientService.send<number>(
      this.AuthTcpClient,
      '/token',
      token,
    );
  }

  public async registration(dto: RegistrationDto) {
    return await this.tcpClientService.send<string>(
      this.AuthTcpClient,
      '/auth/registration',
      dto,
    );
  }

  public async login(dto: LoginDto) {
    return await this.tcpClientService.send<string>(
      this.AuthTcpClient,
      '/auth/login',
      dto,
    );
  }
}
