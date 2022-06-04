import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = app.get(ConfigService);
  const port = config.get('PORT');

  await app.listen(port);
  Logger.log(`Api server listening on ${await app.getUrl()}/api`, 'Bootstrap');
}
bootstrap();
