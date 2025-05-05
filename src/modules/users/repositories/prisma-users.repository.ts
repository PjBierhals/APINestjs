import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from '../enums/role.enum';

@Injectable()
export class PrismaUsersRepository extends UsersRepository<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  private mapUser(user: any): User {
    return {
      ...user,
      permission: user.permission as Role,
    };
  }

  private mapUsers(users: any[]): User[] {
    return users.map(this.mapUser);
  }

  async findAll(): Promise<User[] | null> {
    const users = await this.prisma.user.findMany({
      include: {
        position: true,
        section: true,
      },
    });
    return this.mapUsers(users);
  }

  async findAllPermission(role: Role): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        position: true,
        section: true,
      },
      where: {
        permission: role,
      },
    });

    return this.mapUsers(users);
  }

  async findAllSection(sectionId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        sectionId,
      },
    });
    return this.mapUsers(users);
  }

  async findAllPosition(positionId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        position: true,
        section: true,
      },
      where: {
        positionId,
      },
    });
    return this.mapUsers(users);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      include: {
        position: true,
        section: true,
      },
      where: {
        id,
      },
    });
    if (!user) return null;

    return this.mapUser(user);
  }

  async findEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      include: {
        position: true,
        section: true,
      },
      where: { email },
    });
    if (!user) return null;
    return this.mapUser(user);
  }

  async delete(id: string): Promise<User | null> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return this.mapUser(user);
  }

  async create(createDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: createDto,
    });
    return this.mapUser(user);
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateDto,
    });
    return this.mapUser(user);
  }
}
