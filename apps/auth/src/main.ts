import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './models/app/app.module';
import { AUTH_HOST, AUTH_PORT, RpcValidationFilter } from '@template/common';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: {
          host: AUTH_HOST,
          port: AUTH_PORT,
        },
      },
    );
    app.useGlobalFilters(new RpcValidationFilter());
    await app.listen();
  } catch (e) {
    Logger.error(`❌ Error starting AUTH, ${e}`, '', 'Bootstrap', false);
    process.exit();
  }
}

bootstrap().catch((err) => {
  Logger.error(`❌ Error starting AUTH, ${err}`, '', 'Bootstrap', false);
  throw err;
});
