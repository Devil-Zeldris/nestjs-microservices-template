import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RedisCacheService } from '@template/common';

@Injectable()
export class AuthorizationRedisService {
  constructor(
    @Inject(forwardRef(() => RedisCacheService))
    private redisCacheService: RedisCacheService,
  ) {}

  public async addUserToken(
    userId: number,
    token: string,
    ttl: number,
  ): Promise<void> {
    return await this.redisCacheService.set(userId.toString(), token, {
      ttl: ttl === null ? 0 : ttl,
    });
  }

  public async getUserToken(userId: number): Promise<string> {
    return await this.redisCacheService.get(userId.toString());
  }

  public async deleteUserToken(userId: number): Promise<void> {
    return await this.redisCacheService.del(userId.toString());
  }
}
