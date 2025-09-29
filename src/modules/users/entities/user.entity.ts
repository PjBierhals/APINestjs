import { Position } from 'src/modules/positions/entities/position.entity';
import { Role } from './../enums/role.enum';
import { Section } from 'src/modules/sections/entities/section.entity';
export class User {
  id?: string;
  email: string;
  password: string;
  name: string;
  status: boolean;
  permission: Role;
  positionId: string | Partial<Position>;
  sectionId: string | Partial<Section>;
  createdAt: Date;
  updatedAt: Date;
}
