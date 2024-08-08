import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from 'src/repository/User/user.service'
import { User } from 'src/entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}