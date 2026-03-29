import { AllExceptionsFilter } from '@filters/http-exception.filter';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TrimPipe } from '@pipes/trim.pipe';
import helmet from 'helmet';
import { AppModule } from './app.module';

function mapValidationErrors(errors: ValidationError[]): any {
  const result = {};
  errors.forEach((error) => {
    if (error.children && error.children.length > 0) {
      console.log(error.children);
      result[error.property] = mapValidationErrors(error.children);
    } else {
      result[error.property] = Object.values(error.constraints || {});
    }
  });
  return result;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: configService.get<string>('ALLOWED_ORIGINS')?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeader: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
    preflightContinue: false,
  });

  app.use(helmet());

  app.useGlobalPipes(
    new TrimPipe(),
    new ValidationPipe({
      whitelist: true,
      transform: true,

      exceptionFactory: (errors) => {
        return new BadRequestException({ message: mapValidationErrors(errors) });
      },
    }),
  );

  app.useGlobalInterceptors(app.get(ResponseInterceptor));
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Cart API')
    .setDescription('Cart application API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('PORT') ?? 3000, '0.0.0.0');
}
bootstrap();
