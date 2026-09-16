// apps/api/src/main.ts

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('AIJewel CRM API')
    .setDescription('Complete CRM API for jewelry business')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Leads', 'Lead management')
    .addTag('Customers', 'Customer management')
    .addTag('WhatsApp', 'WhatsApp integration')
    .addTag('Campaigns', 'Marketing campaigns')
    .addTag('Calls', 'Call management')
    .addTag('Meetings', 'Meeting scheduling')
    .addTag('Knowledge Base', 'Knowledge base')
    .addTag('AI', 'AI features')
    .addTag('Reports', 'Reports and analytics')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Start server
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`✅ Backend running on http://localhost:${port}`);
  console.log(`📚 Swagger docs at http://localhost:${port}/api/docs`);
}

bootstrap().catch(console.error);
