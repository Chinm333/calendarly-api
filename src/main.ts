import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Enable CORS
    app.enableCors({
      origin: '*',
    });
  await app.listen(process.env.PORT);
}
bootstrap();