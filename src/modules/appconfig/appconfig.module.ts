import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration} from './config';
import validateConfig from './config.validations';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [...configuration],
    validate: validateConfig
  })],
})
export class AppConfigModule {}
