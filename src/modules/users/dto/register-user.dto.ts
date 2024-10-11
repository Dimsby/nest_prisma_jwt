import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength, IsEmail, MaxLength, IsStrongPassword, IsEnum } from 'class-validator';
import { BaseUserDto } from './base-user.dto';
import { UserRole } from '../enums/userRole.enum';

/**
 * Register user by themselves
 */
export class RegisterUserDto extends BaseUserDto {
    @IsEmail({}, {
        message: 'Email field should be a proper email'
    })
    @MaxLength(50)
    @MinLength(3)
    @IsNotEmpty()
    @ApiProperty()
    email: string;  
}  
