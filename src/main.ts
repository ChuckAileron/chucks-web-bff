import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const defaultOrigins = ['http://localhost:5177', 'http://127.0.0.1:5177'];
  const envOrigins = (process.env['FRONTEND_URL'] ?? '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter((origin) => origin.length > 0);
  const origins = envOrigins.length > 0 ? envOrigins : defaultOrigins;

  app.enableCors({
    origin: origins,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = Number(process.env['PORT'] ?? 3000);
  await app.listen(port);
  console.log(`BFF running on http://localhost:${port} (CORS: ${origins.join(', ')})`);
}
void bootstrap();
