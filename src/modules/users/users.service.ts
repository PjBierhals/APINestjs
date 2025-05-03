import { Role } from './enums/role.enum';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { HashingService } from '../auth/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly hashService: HashingService,
    private readonly repositoryUser: PrismaUsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashService.hash(
      createUserDto.password,
    );
    return await this.repositoryUser.create(createUserDto);
  }

  async findAll() {
    return await this.repositoryUser.findAll();
  }
  async findAllPermission(role: Role) {
    return await this.repositoryUser.findAllPermission(role);
  }

  async findAllPosition(id: string) {
    return await this.repositoryUser.findAllPosition(id);
  }

  async findAllSection(id: string) {
    return await this.repositoryUser.findAllSection(id);
  }
  async findOne(id: string) {
    return await this.repositoryUser.findOne(id);
  }

  async findEmail(email: string) {
    return await this.repositoryUser.findEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.repositoryUser.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.repositoryUser.delete(id);
  }
}
