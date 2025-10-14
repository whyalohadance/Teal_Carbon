import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MockAuthMiddleware } from './common/middleware/mock-auth.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // folosim NestExpressApplication pentru a permite middleware personalizat
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Middleware-ul nostru care adaugă req.user din headere (x-user-id, x-user-role)
  app.use(new MockAuthMiddleware().use);

  // ✅ Activează validarea DTO-urilor global
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}

bootstrap();
