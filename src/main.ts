import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // app.use((req, res, next) => {
  //   console.log("rien ne donne Received raw request:", req.body);
  // });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();