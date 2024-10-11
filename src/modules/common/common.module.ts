import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controller';
import { LogInterceptor } from './flow';
import { LoggerService} from './provider';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [
        TerminusModule,
        PrismaModule
    ],
    providers: [
        LoggerService,
        LogInterceptor
    ],
    exports: [
        LoggerService,
        LogInterceptor,
    ],
    controllers: [
        HealthController
    ],
})
export class CommonModule {}
