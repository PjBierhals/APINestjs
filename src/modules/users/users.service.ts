import { Role } from './enums/role.enum';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { HashingService } from '../auth/hashing/hashing.service';
import { HttpExceptionCustom } from 'src/common/exceptions/http.exception';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly hashService: HashingService,
    private readonly repositoryUser: PrismaUsersRepository,
  ) {}

  private existingUser({
    user,
    message,
  }: {
    user: User[] | User;
    message: string;
  }) {
    if (!user || (Array.isArray(user) && user.length === 0)) {
      throw HttpExceptionCustom.NotFound(`${message}`);
    }
  }

  async create(createUserDto: CreateUserDto) {
    // conferir email
    const existingEmail = this.repositoryUser.findEmail(createUserDto.email);

    if (existingEmail) {
      throw HttpExceptionCustom.Conflict(
        `O e-mail ${createUserDto.email} já existe.`,
      );
    }
    //conferir position
    //conferir section
    //hash senha
    createUserDto.password = await this.hashService.hash(
      createUserDto.password,
    );
    return await this.repositoryUser.create(createUserDto);
  }

  async findAll() {
    const users = await this.repositoryUser.findAll();
    this.existingUser({
      user: users,
      message: `Não há usuários cadastrados`,
    });
    return users;
  }
  async findAllPermission(role: Role) {
    //tipo do permissão valida
    if (!Object.values(Role).includes(role)) {
      throw HttpExceptionCustom.NotFound(
        `( ${role} )! Não é permissão Valída.`,
      );
    }
    //exite usuários
    const users = await this.repositoryUser.findAllPermission(role);
    this.existingUser({
      user: users,
      message: `Não há usuários com a permissão de ( ${role} ).`,
    });
    return users;
  }

  async findAllPosition(id: string) {
    const users = await this.repositoryUser.findAllPosition(id);

    this.existingUser({
      user: users,
      message: `Não há usuários cadastrados no cargo de id ( ${id} ).`,
    });
    return users;
  }

  async findAllSection(id: string) {
    const users = await this.repositoryUser.findAllSection(id);
    this.existingUser({
      user: users,
      message: `Não há usuários cadastrados no setor de id ( ${id} ).`,
    });
    return users;
  }
  async findOne(id: string) {
    //existe este id
    const user = await this.repositoryUser.findOne(id);

    this.existingUser({
      user: user,
      message: `Usuário de id ( ${id} ) não encontrado.`,
    });

    return user;
  }

  async findEmail(email: string) {
    //existe este email
    const user = await this.repositoryUser.findEmail(email);
    this.existingUser({
      user: user,
      message: `Usuário do E-mail ( ${email} ) não foi encontrado.`,
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    //existe este id
    const user = await this.repositoryUser.findOne(id);

    this.existingUser({
      user: user,
      message: `Usuário de id ( ${id} ) não foi encontrado.`,
    });

    //confirir o email
    return await this.repositoryUser.update(id, updateUserDto);
  }

  async remove(id: string) {
    //existe este id
    const user = await this.repositoryUser.findOne(id);

    this.existingUser({
      user: user,
      message: `Usuário de id ( ${id} ) não encontrado.`,
    });
    return await this.repositoryUser.delete(id);
  }
}
