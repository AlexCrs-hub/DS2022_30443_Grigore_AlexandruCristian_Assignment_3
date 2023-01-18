import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserDTO } from "src/entities/user/dto/userdto";
import { User } from "src/entities/user/user";
import { JwtAuthGuard } from "src/services/auth/jwt-auth.guard";
import { UsersService } from "src/services/user/user.service";
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
export class UsersController {
    constructor (
        private userService: UsersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<User[]>{
        return await this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createUserDto: UserDTO){
        return await this.userService.create(createUserDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: uuidv4){
        await this.userService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async update(@Param('id') id : uuidv4, @Body() userDTO: Partial<UserDTO>){
        return await this.userService.update(id,userDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get('regular')
    async getRegularUsers(): Promise<User[]>{
        return await this.userService.findAllRegular();
    }

    @UseGuards(JwtAuthGuard)
    @Get('admins')
    async getAdminUsers(): Promise<User[]>{
        return await this.userService.findAllAdmins();
    }

}   