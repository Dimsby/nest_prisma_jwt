import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

/**
 * Update user by admin
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
