import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const port = process.env.PORT ?? 3000;
  const ipAddress = process.env.ADDRESS ?? 'localhost';
  await app.listen(port, ipAddress);

  // Exibe no console a URL em que o servidor está rodando.
  console.log(`🚀 Server is running on http://${ipAddress}:${port}`);
}

bootstrap();
