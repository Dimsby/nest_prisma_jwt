import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { UsersModule } from './users';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './appconfig';

@Module({
    imports: [
        CommonModule,
        AuthModule,        
        UsersModule,  
        AppConfigModule
    ]
})
export class ApplicationModule {}
