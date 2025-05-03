import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class PositionsService {
  constructor(protected readonly prisma: PrismaService) {
    // ✅ inicializa o `this.orm` na classe abstrata
  }
  create(createPositionDto: CreatePositionDto) {
    return 'This action adds a new position';
  }

  findAll() {
    return this.prisma.position.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} position`;
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    return `This action updates a #${id} position`;
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}
