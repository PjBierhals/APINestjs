import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaSectionsRepository } from './repositories/prisma-sections.repository';
import { Section } from './entities/section.entity';
import { HttpExceptionCustom } from 'src/common/exceptions/http.exception';

@Injectable()
export class SectionsService {
  constructor(
    protected readonly repositorySection: PrismaSectionsRepository,) { }


  private existingSection({
    section,
    message
  }: {
    section: Section[] | Section | null;
    message: string;
  }) { // caso não exista nada
    if (!section) {
      throw HttpExceptionCustom.NotFound(message);
    }
    if (!section || (Array.isArray(section) && section.length === 0)) {
      throw HttpExceptionCustom.NotFound(`${message}`);
    }

  }



  async create(createSectionDto: CreateSectionDto) {
    //conferir a descrição
    const description = await this.repositorySection.findDescription(createSectionDto.description)
    if (description) {
      throw HttpExceptionCustom.Conflict(`
        A descrição ${createSectionDto.description} já existe.`);
    }
    //conferir se esxite a sessão
    if (createSectionDto.sectionParentId) {
      const sectionParentId = await this.repositorySection.findOne(createSectionDto.sectionParentId);
      this.existingSection({ section: sectionParentId, message: `Não há seção cadastrada com este ID ( ${createSectionDto.sectionParentId} )` })
    }
    return await this.repositorySection.create(createSectionDto);
  }

  async findAll() {
    //se estiver vazia a tabela
    const sections = await this.repositorySection.findAll();
    this.existingSection({
      section: sections,
      message: 'Não há secão cadastrados',
    });
    return sections;
  }

  async findOne(id: string) {
    const section = await this.repositorySection.findOne(id);
    this.existingSection({
      section: section,
      message: `A seção de ID ( ${id} ) não foi encontrada.`,
    });
    return section;
  }

async update(id: string, updateSectionDto: UpdateSectionDto) {
  // Verifica se a seção existe
   const section = await this.repositorySection.findOne(id);
    this.existingSection({
      section: section,
      message: `A seção de ID ( ${id} ) não foi encontrada.`,
    });
 
  // Verifica duplicidade de descrição (ignora a própria seção)
  if (updateSectionDto.description) {
    const existingDescription = await this.repositorySection.findDescription(
      updateSectionDto.description,
    );

    if (existingDescription && existingDescription.id !== id) {
      throw HttpExceptionCustom.Conflict(
        `A descrição da seção "${updateSectionDto.description}" já existe.`,
      );
    }
  }

  // Valida o sectionParentId se informado
  if (updateSectionDto.sectionParentId) {
    const sectionParent = this.existingSection({
      section: await this.repositorySection.findOne(updateSectionDto.sectionParentId),
      message: `Não há seção cadastrada com este ID (${updateSectionDto.sectionParentId})`,
    });

    // Opcional: evita que a seção seja filha dela mesma
    if (updateSectionDto.sectionParentId === id) {
      throw HttpExceptionCustom.BadRequest(
        'Uma seção não pode ser pai dela mesma.',
      );
    }
  }

  // Atualiza a seção
  return await this.repositorySection.update(id, updateSectionDto);
}

  async remove(id: string) {
     const section = await this.repositorySection.findOne(id);
    this.existingSection({
      section: section,
      message: `A seção de ID ( ${id} ) não foi encontrada.`,
    });
    return section;
  }
}
