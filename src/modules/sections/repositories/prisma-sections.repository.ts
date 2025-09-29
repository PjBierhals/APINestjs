import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateSectionDto } from "../dto/create-section.dto";
import { UpdateSectionDto } from "../dto/update-section.dto";
import { Section } from "../entities/section.entity";
import { SectionsRepository } from "./sections.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaSectionsRepository extends 
SectionsRepository<Section, CreateSectionDto, UpdateSectionDto> {
    
    
    constructor (private readonly prisma: PrismaService){
        super();
    }
    
    async findAll(): Promise<Section[]> {
        return await this.prisma.section.findMany();     
    }
    async findOne(id: string): Promise<Section> {
        return await this.prisma.section.findUnique({
            where:{
                id,
            },
        });
    }
    async findDescription(description: string): Promise<Section> {
        return await this.prisma.section.findUnique({
            where:{
                description,
            },
        });
    }
    async delete(id: string): Promise<Section> {
        return await this.prisma.section.delete({
            where:{
                id
            }
        });
    }
    async create(createDto: CreateSectionDto): Promise<Section> {
        return await this.prisma.section.create({
            data: createDto
        })
    }
    async update(id:string, updateDto: UpdateSectionDto): Promise<Section> {
        return await this.prisma.section.update({
            where:{ id },
            data: updateDto
        })
    }
    
 }
