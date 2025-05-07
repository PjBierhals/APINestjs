import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController, UserController } from './users.controller';
import { HashingService } from '../auth/hashing/hashing.service';
import { BcryptService } from '../auth/hashing/bcrypt.service';
import { UsersRepositoriesModule } from './repositories/users.repositories.module';
import { PositionsModule } from '../positions/positions.module';

@Module({
  imports: [UsersRepositoriesModule, PositionsModule],
  controllers: [UsersController, UserController],
  providers: [
    UsersService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class UsersModule {}
