import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { PrismaService } from './prisma/prisma.service';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.get(PrismaService).enableShutdownHooks(app);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
})();
