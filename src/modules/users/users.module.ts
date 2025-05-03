import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController, UserController } from './users.controller';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { HashingService } from '../auth/hashing/hashing.service';
import { BcryptService } from '../auth/hashing/bcrypt.service';

@Module({
  controllers: [UsersController, UserController],
  providers: [
    UsersService,
    PrismaUsersRepository,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class UsersModule {}
