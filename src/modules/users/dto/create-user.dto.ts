import {
  IsString,
  IsEmail,
  IsBoolean,
  IsEnum,
  IsUUID,
  IsNotEmpty,
  Length,
  Matches,
  IsOptional,
} from 'class-validator';
import { Role } from '../enums/role.enum';
export class CreateUserDto {
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email!: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @Length(6, 50, { message: 'A senha deve ter entre 6 e 50 caracteres.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'A senha deve conter pelo menos uma letra, um número e ter no mínimo 6 caracteres.',
  })
  password!: string;

  @Length(3, 50, { message: 'A nome deve ter entre 3 e 50 caracteres.' })
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsEnum(Role, {
    message: 'O valor deve ser MASTER ou ADMINSTRATOR ou GESTOR ou OPERATOR',
  })
  permission: Role;

  @IsUUID()
  positionId: string;

  @IsUUID()
  sectionId: string;
}
