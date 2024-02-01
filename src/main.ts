import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";

const DEFAULT_PORT = process.env.PORT || 8080;

async function bootstrap() {
  // APP
  const app = await NestFactory.create(AppModule, {
    cors: true
    //logger: ['error', 'warn', 'debug'],
  });
  app.enableCors();
  // CONFIG
  const configService = app.get(ConfigService);
  // PORT
  const PORT = configService.get<number>('PORT') || DEFAULT_PORT || 8080;
  // START SERVER LISTENER
  await app.listen(PORT, '0.0.0.0', () => console.log('START SERVER ON: http://localhost:' + PORT ));
}
bootstrap();

