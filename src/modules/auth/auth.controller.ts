import { Body, Controller, Get, Post, SerializeOptions, UseGuards, Request, HttpStatus, HttpCode, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from './dto';
import { RegisterUserDto } from '../users/dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @SerializeOptions({groups: ['me']})    
    @ApiOperation({ summary: 'Login any user type'})   
    @ApiOkResponse({ type: LoginResponseDto })
    login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
        return this.authService.login(request);
    }

    @Post('register')
    @ApiOperation({ summary: 'Sign up as visitor'}) 
    register(@Body() request: RegisterUserDto): Promise<LoginResponseDto> {
        return this.authService.login(request);
    }

    @Post('register_owner')
    @ApiOperation({ summary: 'Sign up as venue owner'}) 
    registerOwner(@Body() request: RegisterUserDto): Promise<LoginResponseDto> {
        return this.authService.login(request);
    }
 
}