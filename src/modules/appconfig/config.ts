import { registerAs } from '@nestjs/config';
import EnvironmentEnum from './enum/environment.enum';
//import { AppConfig, DatabaseConfig } from '../config.interface';

enum ConfigKey {
  App = 'APP',
  Jwt = 'JWT',
  Swagger = 'SWAGGER',
}

const AppConfig = registerAs(
  ConfigKey.App, () => ({
    env:
    EnvironmentEnum[process.env.NODE_ENV as keyof typeof EnvironmentEnum] ||
      'development',
    port: Number(process.env.API_PORT),
    prefix: process.env.API_PREFIX,
    healthToken: process.env.HEALTH_TOKEN,
    databaseUrl: process.env.DATABASE_URL
  })
);
 
const JwtConfig = registerAs(
    ConfigKey.Jwt, () => ({
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES,
        issuer: process.env.JWT_ISSUER
    })    
) 

const SwaggerConfig = registerAs(
    ConfigKey.Swagger, () => ({
        enabled: process.env.SWAGGER_ENABLE,
        title: process.env.SWAGGER_TITLE,
        description: process.env.SWAGGER_DESCRIPTION,
        prefix: process.env.SWAGGER_PREFIX
    })    
) 

export const configuration = [AppConfig, JwtConfig, SwaggerConfig];