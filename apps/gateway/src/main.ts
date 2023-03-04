import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import {
  AES_SECRET,
  GATEWAY_CORS_WHITELIST,
  GATEWAY_HOST,
  GATEWAY_PORT,
  ValidationPipe,
} from '@template/common';
import { AppModule } from './models/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: GATEWAY_CORS_WHITELIST,
    credentials: true,
  });
  app.use(cookieParser(AES_SECRET));
  app.disable('x-powered-by');

  await app.listen(GATEWAY_PORT, GATEWAY_HOST).then(() => {
    Logger.log(
      `[Microservice] Gateway successfully started on ${GATEWAY_HOST}:${GATEWAY_PORT}`,
    );
  });
}
bootstrap();
