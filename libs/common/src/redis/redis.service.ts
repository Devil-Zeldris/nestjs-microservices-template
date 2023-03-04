import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { APP_NAME, REDIS, REDIS_CACHE_DURATION } from '@template/common';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class RedisService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      ...REDIS,
      duration: REDIS_CACHE_DURATION,
      store: redisStore,
      prefix: APP_NAME,
    };
  }
}
