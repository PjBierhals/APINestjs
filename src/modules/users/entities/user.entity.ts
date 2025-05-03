import { Role } from './../enums/role.enum';
export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  status: boolean;
  permission: Role;
  positionId: string;
  sectionId: string;
  createdAt: Date;
  updatedAt: Date;
}
