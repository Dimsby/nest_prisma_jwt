
import { IsNotEmpty, IsString, IsEnum, IsNumber, Min, Max, IsBoolean} from 'class-validator';
import EnvironmentEnum from '../enum/environment.enum';

export class configDto {

 //   @IsEnum(EnvironmentEnum)
 //   @IsNotEmpty()
 //   NODE_ENV: EnvironmentEnum;

    @IsNumber()
    @Min(1024)
    @Max(65535)
    API_PORT: number

    @IsString()
    API_PREFIX: string;

    @IsString()
    HEALTH_TOKEN: string;

    @IsString()
    @IsNotEmpty()
    DATABASE_URL: string;

    // JWT

    @IsString()
    @IsNotEmpty()
    JWT_SECRET: string;

    @IsString()
    JWT_ISSUER: string;   

    @IsString()
    @IsNotEmpty()    
    JWT_EXPIRES: string;    

    // SWAGGER 

    @IsString()
    SWAGGER_ENABLE: string;

    @IsString()
    SWAGGER_TITLE: string

    @IsString()
    SWAGGER_DESCRIPTION: string    

    @IsString()
    SWAGGER_PREFIX: string;    

}  
