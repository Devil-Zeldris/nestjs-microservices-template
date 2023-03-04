import { resolve } from 'path';
import { config } from 'dotenv';
import * as process from 'process';

config({
  path: resolve(__dirname, '..', '..', '..', '.env'),
});

export enum EnvType {
  DEV = 'development',
  PROD = 'production',
}

export const COOKIE_NAME =
  'TEMPLATE_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-channels';
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || 'localhost';

//Enviroment
export const NODE_ENV: EnvType =
  (process.env.NODE_ENV as EnvType) || EnvType.DEV;
export const LOG_DIR: string = process.env.LOG_DIR || './log';

//Application name
export const APP_NAME: string = process.env.APP_NAME || 'template';

//Application host & port
export const CORE_NAME: string = process.env.CORE_NAME || 'CORE';
export const CORE_HOST: string = process.env.CORE_HOST || '0.0.0.0';
export const CORE_PORT: number = Number(process.env.CORE_PORT) || 3000;

export const AUTH_NAME: string = process.env.AUTH_NAME || 'AUTH';
export const AUTH_HOST: string = process.env.AUTH_HOST || '0.0.0.0';
export const AUTH_PORT: number = Number(process.env.AUTH_PORT) || 3001;

export const GATEWAY_CORS_WHITELIST =
  process.env.GATEWAY_CORS_WHITELIST !== '*'
    ? process.env.GATEWAY_CORS_WHITELIST?.split(',')
    : '*';
export const GATEWAY_HOST: string = process.env.GATEWAY_HOST || '0.0.0.0';
export const GATEWAY_PORT: number = Number(process.env.GATEWAY_PORT) || 3002;

//MySQL
export const MYSQL_LOGGING: boolean = process.env.MYSQL_LOGGING === 'true';
export const MYSQL_HOST: string = process.env.MYSQL_HOST || 'localhost';
export const MYSQL_PORT: number = Number(process.env.MYSQL_PORT) || 3306;
export const MYSQL_USER: string = process.env.MYSQL_USER || 'root';
export const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD || 'root';
export const MYSQL_DATABASE: string = process.env.MYSQL_DATABASE || 'testdb';

//Typeorm
export const TYPEORM = {
  logging: MYSQL_LOGGING,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};

//Redis
export const REDIS_HOST: string = process.env.REDIS_HOST || '127.0.0.1';
export const REDIS_PORT: number = +process.env.REDIS_PORT || 6379;
export const REDIS_USER: string = process.env.REDIS_USER;
export const REDIS_PASSWORD: string = process.env.REDIS_PASSWORD;
export const REDIS_DATABASE: number = +process.env.REDIS_DATABASE || 0;
export const REDIS_CACHE_DURATION: number =
  +process.env.REDIS_CACHE_DURATION || 10e3;
const redis_environment = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USER,
  password: REDIS_PASSWORD,
  db: REDIS_DATABASE,
};
export const REDIS = redis_environment;

//User
export const USER_TOKEN_TTL: number =
  Number(process.env.USER_TOKEN_TTL) || 86400;

// Crypto AES secret key
export const AES_SECRET: string = process.env.AES_SECRET || '';
export const BCRYPT_SALT: number = Number(process.env.BCRYPT_SALT) || 12;
