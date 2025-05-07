import { Position } from 'src/modules/positions/entities/position.entity';
import { Role } from './../enums/role.enum';
import { Sector } from 'src/modules/sectors/entities/sector.entity';
export class User {
  id?: string;
  email: string;
  password: string;
  name: string;
  status: boolean;
  permission: Role;
  positionId: string | Partial<Position>;
  sectionId: string | Partial<Sector>;
  createdAt: Date;
  updatedAt: Date;
}
