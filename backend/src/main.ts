import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import IORedis from "ioredis";
import { RedisStore } from "connect-redis";

import * as cookieParser from "cookie-parser";
import * as session from "express-session";

import { AppModule } from "./app.module";
import { ms } from "src/utils/ms.util";
import { isBoolean } from "src/utils/isBoolean.util";
import { createClient } from "redis";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const redisClient = createClient({
    url: configService.getOrThrow("REDIS_URI"),
  });
  redisClient.connect().catch(console.error);

  redisClient.on("error", (err) => {
    console.log("Redis client error", err);
  });

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: configService.getOrThrow("SESSION_PREFIX"),
  });

  app.use(cookieParser());

  app.use(
    session({
      store: redisStore,
      secret: configService.getOrThrow("SESSION_SECRET"),
      name: configService.getOrThrow("SESSION_NAME"),
      resave: true,
      // Указывает, нужно ли сохранять сессию без инициализации
      saveUninitialized: false,
      cookie: {
        domain: configService.getOrThrow("SESSION_DOMAIN"),
        maxAge: ms(configService.getOrThrow("SESSION_MAX_AGE")),
        httpOnly: isBoolean(configService.getOrThrow("SESSION_HTTP_ONLY")),
        secure: isBoolean(configService.getOrThrow("SESSION_SECURE")),
        sameSite: "lax",
      },
    })
  );

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`App is running on http://localhost:${process.env.PORT}`);
}
bootstrap();
