import { CacheModule, Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisCacheService } from './redis.cache.service';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useClass: RedisService,
    }),
  ],
  providers: [RedisService, RedisCacheService],
  exports: [RedisService, RedisCacheService],
})
export class RedisModule {}
