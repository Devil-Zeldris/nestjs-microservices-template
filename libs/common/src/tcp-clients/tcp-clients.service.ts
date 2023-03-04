import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxyName } from './tcp-clients.interfaces';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_NAME, CORE_NAME } from '../enviroment';
import { MicroservicesErrors } from '../microservices';

@Injectable()
export class TcpClientsService {
  constructor(
    @Inject(CORE_NAME)
    private coreClientProxy: ClientProxy,
    @Inject(AUTH_NAME)
    private authClientProxy: ClientProxy,
  ) {}

  private readonly clientProxy: Record<ClientProxyName, ClientProxy> = {
    [ClientProxyName.CORE]: this.coreClientProxy,
    [ClientProxyName.AUTH]: this.authClientProxy,
  };

  public async send<T>(
    client: ClientProxyName,
    pattern: string,
    data: any,
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.clientProxy[client].send(pattern, data).subscribe(
        (response) => {
          if (response?.error) {
            console.log(response);
            return reject(
              new HttpException(response, response?.statusCode || 500),
            );
          }
          return resolve(response);
        },
        (e) => {
          console.log(e);
          reject(
            new InternalServerErrorException(
              MicroservicesErrors.SERVICE_UNAVAILABLE,
            ),
          );
        },
      );
    });
  }
}
