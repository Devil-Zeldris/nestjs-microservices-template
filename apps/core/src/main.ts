import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './models/app/app.module';
import { CORE_HOST, CORE_PORT, RpcValidationFilter } from '@template/common';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: {
          host: CORE_HOST,
          port: CORE_PORT,
        },
      },
    );

    app.useGlobalFilters(new RpcValidationFilter());
    await app.listen();
  } catch (e) {
    Logger.error(`❌ Error starting CORE, ${e}`, '', 'Bootstrap', false);
    process.exit();
  }
}

bootstrap().catch((err) => {
  Logger.error(`❌ Error starting CORE, ${err}`, '', 'Bootstrap', false);
  throw err;
});
