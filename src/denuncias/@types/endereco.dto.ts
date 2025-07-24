import { createZodDto } from 'nestjs-zod';
import {
  createValidator,
  partialSchema,
} from 'src/shared/utils/validation/zod';
import { z } from 'zod';

const EnderecoSchema = z.object({
  cep: z.string().nonempty().max(9),
  logradouro: z.string().nonempty().max(100),
  numero: z.string().nonempty().max(10),
  jardim: z.string().nonempty().max(50),
  cidade: z.string().nonempty().max(50),
  estado: z.string().nonempty().max(50),
  pais: z.string().nonempty().max(50),
});

export const PartialEnderecoSchema = partialSchema(EnderecoSchema);

export class EnderecoDTO extends createZodDto(EnderecoSchema) {}
export class PartialEnderecoDTO extends createZodDto(PartialEnderecoSchema) {}

export const EnderecoValidator = createValidator(
  (data) => EnderecoSchema.parse(data),
  'Enderecos',
);

export const partialEnderecoValidator = createValidator(
  (data) => PartialEnderecoSchema.parse(data),
  'Enderecos',
);
