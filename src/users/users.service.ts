import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, EditUserDto } from './dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //* get all users
  async getUsers() {
    return await this.userRepository.find();
  }

  //* get single user
  async getUser(userId: string) {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  //* create user
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (user) {
      throw new BadRequestException('User is already exist');
    }

    const newUser = this.userRepository.create(dto);
    await this.userRepository.save(newUser);
    return { message: 'User created succesfully', newUser };
  }

  //* edit user
  async editUser(id: string, dto: EditUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.update(id, dto);
    return { message: 'changes successfully' };
  }

  //* delete user
  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
    return { message: 'deleted successfully' };
  }
}
