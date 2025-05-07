import { Module } from '@nestjs/common';
import { PrismaUsersRepository } from './prisma-users.repository';

@Module({
  providers: [PrismaUsersRepository],
  exports: [PrismaUsersRepository],
})
export class UsersRepositoriesModule {}
