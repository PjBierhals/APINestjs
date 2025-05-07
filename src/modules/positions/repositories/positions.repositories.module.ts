import { Module } from '@nestjs/common';
import { PrismaPositionRepository } from './prisma-positions.repositories';

@Module({
  providers: [PrismaPositionRepository],
  exports: [PrismaPositionRepository],
})
export class PositionsRepositoriesModule {}
