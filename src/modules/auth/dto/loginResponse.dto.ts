import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';

export class LoginResponseDto {
    @ApiProperty()
    token: string;

    //@ApiProperty()
    //refreshToken: string;

    //@ApiProperty()
    //tokenExpires: number;

    @ApiProperty({
        type: () => UserEntity,
    })
    user: UserEntity;
}
