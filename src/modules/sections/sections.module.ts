import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController, SectionController } from './sections.controller';
import { SectionsRepositoriesModule } from './repositories/sections.repositories.module';

@Module({
  controllers: [SectionsController, SectionController],
  providers: [SectionsService],
  imports: [SectionsRepositoriesModule],
  exports: [SectionsService]
})
export class SectionsModule {}
