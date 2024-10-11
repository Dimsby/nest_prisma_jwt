import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, SerializeOptions, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { AdminGuard, RegisteredGuard } from '../common/security';
import { FastifyRequest } from 'fastify';
import { UpdateMeDto } from './dto/update-me.dto';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth() 
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @SerializeOptions({groups: ['admin']})
    @UseGuards(AdminGuard)      
    @ApiOperation({ summary: 'Create new user by admin'})
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get() 
    @SerializeOptions({groups: ['admin']})
    @UseGuards(AdminGuard)   
    @ApiOperation({ summary: 'Get users by admin'})   
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @SerializeOptions({groups: ['admin']})
    @UseGuards(AdminGuard)      
    @ApiOperation({ summary: 'Get single user by admin'})   
    @ApiOkResponse({ type: UserEntity })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @SerializeOptions({groups: ['admin']})
    @UseGuards(AdminGuard)    
    @ApiOperation({ summary: 'Get users by admin'})  
    @ApiOkResponse({ type: UserEntity })   
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @SerializeOptions({groups: ['admin']})
    @UseGuards(AdminGuard)      
    @ApiOperation({ summary: 'Delete user by admin'})  
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }    

    @Get('/me')
    @SerializeOptions({groups: ['me']})
    @UseGuards(RegisteredGuard)      
    @ApiOperation({ summary: 'Get current user'})  
    @ApiOkResponse({type: UserEntity})
    public getMe(@Req() request: FastifyRequest): Promise<UserEntity> {
        return this.usersService.getMe(request);
    }

    @Patch('/me')
    @SerializeOptions({groups: ['me']})
    @UseGuards(RegisteredGuard)     
    @ApiOperation({ summary: 'Update current user'})  
    @ApiOkResponse({type: UserEntity})
    public updateMe(@Body() updateUserDto: UpdateMeDto, @Req() request: FastifyRequest): Promise<UserEntity> {
        return this.usersService.updateMe(updateUserDto, request);
    }    
}
