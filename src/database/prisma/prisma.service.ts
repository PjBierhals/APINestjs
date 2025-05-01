import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Prisma conectado com sucesso!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma desconectado!');
  }
}
