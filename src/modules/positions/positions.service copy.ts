// import { Injectable } from '@nestjs/common';
// import { CreatePositionDto } from './dto/create-position.dto';
// import { UpdatePositionDto } from './dto/update-position.dto';
// import { HttpExceptionCustom } from 'src/common/exceptions/http.exception';
// import { Position } from './entities/position.entity';
// import { PrismaPositionRepository } from './repositories/prisma.position.repository';

// @Injectable()
// export class PositionsService {
//   constructor(
//     protected readonly repositoryPosition: PrismaPositionRepository,
//   ) {}

//   private existingPosition({
//     position,
//     message,
//   }: {
//     position: Position[] | Position;
//     message: string;
//   }) {
//     if (!position || (Array.isArray(position) && position.length === 0)) {
//       throw HttpExceptionCustom.NotFound(`${message}`);
//     }
//   }

//   async create(createPositionDto: CreatePositionDto) {
//     //conferir a description
//     const description = await this.repositoryPosition.findDescription(
//       createPositionDto.description,
//     );
//     if (description) {
//       throw HttpExceptionCustom.Conflict(
//         `A descrição ${createPositionDto.description} já existe.`,
//       );
//     }
//     return await this.repositoryPosition.create(createPositionDto);
//   }

//   async findAll() {
//     //se estiver vazia a tabela
//     const positions = await this.repositoryPosition.findAll();
//     this.existingPosition({
//       position: positions,
//       message: 'Não há cargos cadastrados',
//     });
//     return positions;
//   }

//   async findOne(id: string) {
//     //verificar id
//     const position = await this.repositoryPosition.findOne(id);
//     this.existingPosition({
//       position: position,
//       message: `O cargo de id ( ${id} ) não foi encontrado.`,
//     });
//     return position;
//   }

//   async update(id: string, updatePositionDto: UpdatePositionDto) {
//     //verificar id
//     const position = await this.repositoryPosition.findOne(id);
//     this.existingPosition({
//       position: position,
//       message: `O cargo de id ( ${id} ) não foi encontrado.`,
//     });
//     //verificar a descrição
//     const description = await this.repositoryPosition.findDescription(
//       updatePositionDto.description,
//     );
//     if (description) {
//       throw HttpExceptionCustom.Conflict(
//         `A descrição ${updatePositionDto.description} já existe.`,
//       );
//     }
//     return await this.repositoryPosition.update(id, updatePositionDto);
//   }

//   async remove(id: string) {
//     //verificar id
//     const position = await this.repositoryPosition.findOne(id);
//     this.existingPosition({
//       position: position,
//       message: `O cargo de id ( ${id} ) não foi encontrado.`,
//     });

//     return `This action removes a #${id} position`;
//   }
// }
