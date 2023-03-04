import { Module } from '@nestjs/common';
import { TcpClientsModule } from '@template/common';
import { UsersController } from './users.controller';
import { UsersServices } from './users.services';

@Module({
  imports: [TcpClientsModule],
  controllers: [UsersController],
  providers: [UsersServices],
})
export class UsersModule {}
