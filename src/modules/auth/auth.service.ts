import { HttpStatus, Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginRequestDto, LoginResponseDto } from './dto';
import * as bcrypt from 'bcrypt'
import { UserEntity } from '../users/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { RegisterUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/enums/userRole.enum';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService
    ) { }

    async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
        // Fetch a user with the given email
        const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });

        // If no user is found, throw an error
        if (!user) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                message: [{
                    field: "email",
                    error: "Not Found"
                }],
            });
        }

        // If password was not set or wrong password
        if (!user.password || !await bcrypt.compare(
            loginDto.password,
            user.password,
        )) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                message: [{
                    field: "password",
                    error: "Incorrect Password"
                }],
            });
        }

        // Generate a JWT containing token and user
        return {
            user: new UserEntity(user),
            token: jwt.sign({
                userId: user.id,
                name: [user.firstName, user.lastName].join(' '),
                role: user.role,
                //sessionId: session.id,
                //hash,                
            }, this.configService.get('JWT.secret') as string, { expiresIn: this.configService.get('JWT.expires')})
        };
    }  

    async register(registerUserDto: RegisterUserDto) {
        await this.usersService.create({ ...registerUserDto, role: UserRole.VISITOR });
        // @todo after register email
    }

    async registerOwner(registerUserDto: RegisterUserDto) {
        // @todo add checks for owner registration
        await this.usersService.create({ ...registerUserDto, role: UserRole.OWNER });
        // @todo after register email
    }

}
