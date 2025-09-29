export abstract class SectionsRepository<Sector, CreateDto, UpdateDto> {
    abstract findAll(): Promise<Sector[]>;
    abstract findOne(id: string): Promise<Sector | null>;
    abstract findDescription(description: string): Promise<Sector | null>;
    abstract delete(id: string): Promise<Sector | null>;
    abstract create(createDto: CreateDto): Promise<Sector>;
    abstract update(id: String ,updateDto: UpdateDto): Promise<Sector>;


}
