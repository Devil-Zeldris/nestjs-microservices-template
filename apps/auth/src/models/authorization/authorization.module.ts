import { Module } from '@nestjs/common';
import {
  EncryptionModule,
  RedisModule,
  TcpClientsModule,
} from '@template/common';
import { AuthorizationRedisService } from './authorization.redis.service';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';

@Module({
  imports: [RedisModule, EncryptionModule, TcpClientsModule],
  providers: [AuthorizationRedisService, AuthorizationService],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}
