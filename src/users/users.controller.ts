import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, EditUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @Put(':id')
  async editUser(
    @Param('id') id: string,
    @Body() dto: EditUserDto,
  ) {
    return await this.userService.editUser(id, dto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
