import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import fs from 'fs'

async function bootstrap() {
  dotenv.config()

  
  const key = fs.readFileSync('localhost+1-key.pem');
  const cert = fs.readFileSync('localhost+1.pem');
  const app = await NestFactory.create(AppModule, 
    {
    httpsOptions: {
      key ,
      cert 
    }
  }
);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  app.getHttpAdapter().getInstance().set('trust proxy', 1);
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Authorization, Accept',
    credentials: false,
    // origin: true,
    // credentials: true
  });
  const host = String(process.env.HOST);
  const port = Number(process.env.PORT);
  
  await app.listen(port,host);
  console.log(`Server running on ${host}:${port}`);

}
bootstrap();
