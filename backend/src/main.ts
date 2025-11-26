import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Authorization, Accept',
    credentials: false,
  });

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';

  await app.listen(port, host);
  console.log(`Server running on ${host}:${port}`);
}
bootstrap();

//because a class we must use new and .use()
//if middleware was function app.use(loggerMiddleware) enough
// app.use(new LoggerMiddleware().use);