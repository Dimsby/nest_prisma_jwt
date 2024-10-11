import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';

import { HealthGuard } from '../security/health.guard';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('health')
export class HealthController {

    public constructor(
        private readonly health: HealthCheckService,
        private readonly database: PrismaHealthIndicator,
        private readonly prisma: PrismaService
    ) {}

    @Get()
    @ApiBearerAuth() 
    @UseGuards(HealthGuard)
    @ApiOperation({ summary: 'Check server status using HEALTH_TOKEN'})
    public async healthCheck() {

        return this.health.check([
            async () => this.database.pingCheck('database', this.prisma),
            () => ({
                http: {
                    status: 'up',
                    uptime: process.uptime()
                }
            })
        ]);
    }

}
