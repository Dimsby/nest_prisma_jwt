import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsStrongPassword } from 'class-validator';

/**
 * Base request dto for users
 */
export class BaseUserDto {
    @IsString()
    @MaxLength(100)
    @ApiProperty()
    firstName: string;

    @IsString()
    @MaxLength(100)
    @ApiProperty()
    lastName: string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    }, {
        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.',
    })
    @ApiProperty()
    password: string;    
}  
