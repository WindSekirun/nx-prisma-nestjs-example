import { NestFactory } from '@nestjs/core';
import { WorkerAppModule } from './app/worker.app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WorkerAppModule);
  console.log('Worker is running');
}

bootstrap();