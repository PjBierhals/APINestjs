import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { Position } from '../entities/position.entity';
import { PositonRepository } from './positions.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPositionRepository extends PositonRepository<
  Position,
  CreatePositionDto,
  UpdatePositionDto
> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(): Promise<Position[]> {
    return await this.prisma.position.findMany();
  }
  async findOne(id: string): Promise<Position> {
    return await this.prisma.position.findUnique({
      where: {
        id,
      },
    });
  }
  async findDescription(description: string): Promise<Position> {
    return await this.prisma.position.findUnique({
      where: { description },
    });
  }
  async delete(id: string): Promise<Position> {
    return await this.prisma.position.delete({
      where: { id },
    });
  }
  async create(createDto: CreatePositionDto): Promise<Position> {
    return await this.prisma.position.create({
      data: createDto,
    });
  }
  async update(id: string, updateDto: UpdatePositionDto): Promise<Position> {
    return await this.prisma.position.update({
      where: { id },
      data: updateDto,
    });
  }
}
