export abstract class PositonRepository<Position, CreateDto, UpdateDto> {
  abstract findAll(): Promise<any[]>;
  abstract findOne(id: string): Promise<Position | null>;
  abstract findDescription(description: string): Promise<Position | null>;
  abstract delete(id: string): Promise<Position | null>;
  abstract create(createDto: CreateDto): Promise<Position>;
  abstract update(id: string, updateDto: UpdateDto): Promise<Position>;
}
