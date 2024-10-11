import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { extractTokenPayload } from './security-utils';
import { UserRole } from '../../users/enums/userRole.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OwnerGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) { }

    public canActivate(context: ExecutionContext): boolean {

        const payload: any = extractTokenPayload(context.switchToHttp().getRequest<FastifyRequest>(), this.configService.get('JWT.secret') as string);
        if (!payload || !payload.role || ![UserRole.ADMIN, UserRole.OWNER].includes(payload.role))
            return false

        return true
    }

}
