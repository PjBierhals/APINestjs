import { IsNotEmpty, Length } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty({ message: 'Deve haver um autor.' })
  authorId!: string;
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @Length(2, 50, { message: 'A descrição deve ter entre 2 e 50 caracteres' })
  description!: string;
}
