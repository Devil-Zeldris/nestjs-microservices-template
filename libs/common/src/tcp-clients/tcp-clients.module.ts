import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CORE_HOST, CORE_PORT, CORE_NAME, AUTH_HOST, AUTH_NAME, AUTH_PORT } from "@template/common/enviroment";
import { AuthTcpClientService, CoreTcpClientService } from './clients';
import { TcpClientsService } from './tcp-clients.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CORE_NAME,
        options: {
          transport: Transport.TCP,
          host: CORE_HOST,
          port: CORE_PORT,
        },
      },
      {
        name: AUTH_NAME,
        options: {
          transport: Transport.TCP,
          host: AUTH_HOST,
          port: AUTH_PORT,
        },
      },
    ]),
  ],
  providers: [TcpClientsService, CoreTcpClientService, AuthTcpClientService],
  exports: [TcpClientsService, CoreTcpClientService, AuthTcpClientService],
})
export class TcpClientsModule {}
