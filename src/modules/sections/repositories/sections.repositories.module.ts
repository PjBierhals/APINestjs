import { Module } from '@nestjs/common';
import { PrismaSectionsRepository } from './prisma-sections.repository';

@Module({
    providers:[PrismaSectionsRepository],
    exports:[PrismaSectionsRepository]
})
export class SectionsRepositoriesModule {}
