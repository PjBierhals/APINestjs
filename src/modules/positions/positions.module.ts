import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import {
  PositionController,
  PositionsController,
} from './positions.controller';
import { PositionsRepositoriesModule } from './repositories/positions.repositories.module';

@Module({
  controllers: [PositionsController, PositionController],
  providers: [PositionsService],
  imports: [PositionsRepositoriesModule],
  exports: [PositionsService],
})
export class PositionsModule {}
