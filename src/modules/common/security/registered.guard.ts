import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { extractTokenPayload } from './security-utils';
import { UserRole } from '../../users/enums/userRole.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RegisteredGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) { }
    
    public canActivate(context: ExecutionContext): boolean {
        const request: FastifyRequest = context.switchToHttp().getRequest();
    
        const payload: any = extractTokenPayload(request, this.configService.get('JWT.secret') as string);
        if (!payload || !payload.role || ![UserRole.ADMIN, UserRole.OWNER, UserRole.VISITOR].includes(payload.role))
            return false

        return true
    }

}
