import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PositionsModule } from './modules/positions/positions.module';
import { SectionsModule } from './modules/sections/sections.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { MiddlewareModule } from './modules/middleware/middleware.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    PositionsModule,
    PrismaModule,
    SectionsModule,
    AuthModule,
    MiddlewareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
