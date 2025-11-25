import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config()

 const httpsOptions = {
    key: fs.readFileSync('/path/to/privkey.pem'),
    cert: fs.readFileSync('/path/to/fullchain.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  const port = 443
  await app.listen(port);

  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}))

  app.enableCors({
    origin: true
    // origin: 'http://localhost:5173',
    // credential: true
  })

  // const port = process.env.PORT || 5000

  // await app.listen(port, '0.0.0.0')
  
  //because a class we must use new and .use()
  //if middleware was function app.use(loggerMiddleware) enough
  // app.use(new LoggerMiddleware().use);
  console.log(`hi, back listening on ${port}`);
}
bootstrap();
