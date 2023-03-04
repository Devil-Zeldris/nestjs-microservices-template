import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  EnvType,
  NODE_ENV,
  REDIS,
  REDIS_CACHE_DURATION,
  TYPEORM,
} from '@template/common';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'mysql',
      ...TYPEORM,
      autoLoadEntities: true,
      entities: getMetadataArgsStorage().tables.map((t) => t.target),
      synchronize: NODE_ENV === EnvType.DEV,
      cache: {
        type: 'ioredis',
        duration: REDIS_CACHE_DURATION,
        options: {
          ...REDIS,
        },
      },
    };
  }
}
