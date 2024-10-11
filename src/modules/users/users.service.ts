import { HttpStatus, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto, UpdateUserDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { FastifyRequest } from 'fastify';
import { UpdateMeDto } from './dto/update-me.dto';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) { }

	async create(createUserDto: CreateUserDto) {
		createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
		return this.prisma.user.create({ data: createUserDto });
	}

	findAll() {
		return this.prisma.user.findMany();
	}

	async findOne(id: number) {
		const user = await this.prisma.user.findUnique({ where: { id } });
		if (!user)
			throw new UnprocessableEntityException({
				status: HttpStatus.UNPROCESSABLE_ENTITY,
				message: 'Not Found'
			})

		return new UserEntity(user)
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		if (updateUserDto.password) {
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
		}
		return this.prisma.user.update({ where: { id }, data: updateUserDto });
	}

    async updateMe(updateUserDto: UpdateMeDto, request: FastifyRequest): Promise<UserEntity> {
        //@ts-ignore - temporary
        const id = request.payload.userId;
        
        const user = await this.update(id, updateUserDto)
        if (!user) throw new UnauthorizedException()

        return new UserEntity(user)
    }  	

	remove(id: number) {
		return this.prisma.user.delete({ where: { id } });
	}

    async getMe(request: FastifyRequest): Promise<UserEntity> {
        //@ts-ignore - temporary
        const user = await this.prisma.user.findUnique({ where: { id: request.payload.userId } });
        if (!user) throw new UnauthorizedException()

        return new UserEntity(user)
    }
	
}
