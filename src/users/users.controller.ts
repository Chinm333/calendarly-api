import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/Schemas/user.schema';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Post()
    async create(@Body() user: User): Promise<User> {
        return this.usersService.createUser(user);
    }
    @Get()
    async getUser(@Query('userId') userId?: string, @Query('email') email?: string): Promise<User[]> {
        return this.usersService.getUser(userId, email);
    }
    @Put()
    async updateUser(@Body() user: User): Promise<User> {
        return this.usersService.updateUser(user);
    }
    @Delete()
    async deleteUser(@Query('userId') userId: string): Promise<User> {
        return this.usersService.deleteUser(userId);
    }
}
