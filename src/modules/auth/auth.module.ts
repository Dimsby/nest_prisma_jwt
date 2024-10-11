import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users';

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: '123',
            signOptions: { expiresIn: '5m' }}),
        UsersModule                
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }