import { PartialType } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

/**
 * Update user by themselves
 */
export class UpdateMeDto extends PartialType(BaseUserDto) {}
