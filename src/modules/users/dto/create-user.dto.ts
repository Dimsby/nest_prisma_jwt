import { ApiProperty} from '@nestjs/swagger';
import { IsNotEmpty, IsEnum} from 'class-validator';
import { UserRole } from '../enums/userRole.enum';
import { RegisterUserDto } from './register-user.dto';
import { Expose } from 'class-transformer';

/**
 * Create user by admin
 */
export class CreateUserDto extends RegisterUserDto { 

    @IsEnum(UserRole)
    @IsNotEmpty()
    @ApiProperty()
    role: UserRole;    
    
}  
