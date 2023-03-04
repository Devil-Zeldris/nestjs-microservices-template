import { CACHE_MANAGER, forwardRef } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(forwardRef(() => CACHE_MANAGER)) public readonly redis: Cache,
  ) {}

  public set(key: string, data: any, config?: CachingConfig): Promise<any> {
    return this.redis.store.set(key, data, config);
  }

  public mset(key: string, data: any, config?: CachingConfig): Promise<any> {
    return this.redis.store.mset(key, data, config);
  }

  public get(key: string): Promise<any> {
    return this.redis.store.get(key);
  }

  public mget(key: string): Promise<any> {
    return this.redis.store.mget(key);
  }

  public keys(key: string): Promise<any> {
    return this.redis.store.keys(key);
  }

  public del(key: string): Promise<any> {
    return this.redis.store.del(key);
  }

  public ttl(key: string): Promise<any> {
    return this.redis.store.ttl(key);
  }
}
