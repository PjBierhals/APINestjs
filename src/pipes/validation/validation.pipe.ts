import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'; // Importa os decorators e classes necessárias do NestJS.
import { validate } from 'class-validator'; // Função do 'class-validator' para realizar a validação dos DTOs.
import { plainToInstance } from 'class-transformer'; // Função do 'class-transformer' para transformar um objeto simples em uma instância de uma classe DTO.

@Injectable() // Marca a classe como um serviço injetável no NestJS.
export class ValidationPipe implements PipeTransform<any> {
  // Implementa o método transform para realizar a validação do valor de entrada.
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // Verifica se a metadada do tipo (metatype) não está presente ou se o tipo não precisa de validação.
    if (!metatype || !this.toValidate(metatype)) {
      return value; // Se não houver tipo ou se o tipo não precisa de validação, retorna o valor original.
    }

    // Transforma o valor recebido em uma instância do DTO correspondente.
    const object = plainToInstance(metatype, value);

    // Valida o objeto utilizando a função 'validate' do 'class-validator'.
    const errors = await validate(object);

    // Se houver erros de validação, lança uma exceção 'BadRequestException'.
    if (errors.length > 0) {
      const messages = errors.map(
        (err) =>
          `${err.property} - ${Object.values(err.constraints).join(', ')}`, // Extrai as mensagens de erro.
      );
      throw new BadRequestException(messages); // Lança uma exceção com os erros encontrados.
    }

    return value; // Se a validação passar, retorna o valor original.
  }

  // Método auxiliar para verificar se o tipo precisa de validação.
  private toValidate(metatype: any): boolean {
    // Tipos que não precisam de validação.
    const types: any[] = [String, Boolean, Number, Array, Object];
    // Retorna false se o tipo não estiver na lista de tipos que não precisam de validação.
    return !types.includes(metatype);
  }
}
