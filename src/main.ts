import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApplicationModule } from './modules/app.module';
import { CommonModule, customValidationPipe, LogInterceptor } from './modules/common';

import "./utils/bigint.property"
import { PrismaClientExceptionFilter } from './modules/common/exception/prisma-client-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';

/**
 * These are API defaults that can be changed using environment variables,
 * it is not required to change them (see the `.env.example` file)
 */
const API_DEFAULT_PORT = 3000;
const API_DEFAULT_PREFIX = '/api/v1/';

/**
 * Build & bootstrap the NestJS API.
 * This method is the starting point of the API; it registers the application
 * module and registers essential components such as the logger and request
 * parsing middleware.
 */
async function bootstrap(): Promise<void> {

    const app = await NestFactory.create<NestFastifyApplication>(
        ApplicationModule,
        new FastifyAdapter()
    );

    const configService = app.get<ConfigService>(ConfigService);

    // Support class-validator and class-transformer
    app.useGlobalPipes(customValidationPipe);

    // @todo Enable Helmet for better API security headers

    // Api prefix
    app.setGlobalPrefix(configService.get('APP.prefix') || API_DEFAULT_PREFIX);

    // Swagger
    if (!configService.get('SWAGGER.enabled') || configService.get('SWAGGER.enabled') === '1') {
        const options = new DocumentBuilder()
        .setTitle(configService.get('SWAGGER.title') as string)
        .setDescription(configService.get('SWAGGER.description') as string)
        .addBearerAuth()
        .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup(configService.get('SWAGGER.prefix') as string , app, document);
    }

    app.useGlobalInterceptors(
        app.select(CommonModule).get(LogInterceptor), // log
        new ClassSerializerInterceptor(app.get(Reflector))
    );

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))    

    console.log('jwt', ExtractJwt.fromAuthHeaderAsBearerToken())

    await app.listen(configService.get('APP.port') || API_DEFAULT_PORT);
}

/**
 * It is now time to turn the lights on!
 * Any major error that can not be handled by NestJS will be caught in the code
 * below. The default behavior is to display the error on stdout and quit.
 *
 * @todo It is often advised to enhance the code below with an exception-catching
 *       service for better error handling in production environments.
 */
bootstrap().catch(err => {

    // eslint-disable-next-line no-console
    console.error(err);

    const defaultExitCode = 1;
    process.exit(defaultExitCode);
});
