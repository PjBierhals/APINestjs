export abstract class UsersRepository<User, CreateDto, UpdateDto> {
  // Métodos abstratos que devem ser implementados nas classes filhas
  abstract findAll(): Promise<User[]>;
  abstract findAllPermission(role: string): Promise<User[]>;
  abstract findAllSection(sectionId: string): Promise<User[]>;
  abstract findAllPosition(positionId: string): Promise<User[]>;
  abstract findOne(id: string): Promise<User | null>;
  abstract findEmail(email: string): Promise<User | null>;
  abstract delete(id: string): Promise<User | null>;
  abstract create(createDto: CreateDto): Promise<User>;
  abstract update(id: string, updateDto: UpdateDto): Promise<User>;
}
