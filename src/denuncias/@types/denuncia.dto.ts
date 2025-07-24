import { createZodDto } from 'nestjs-zod';

import {
  createValidator,
  partialSchema,
} from 'src/shared/utils/validation/zod';

import { z } from 'zod';

const DenunciaSchema = z.object({
  titulo: z.string().nonempty().max(200),
  descricao: z.string().nonempty(),
  denunciante_id: z.string().nonempty(),
});

export const PartialDenunciaSchema = partialSchema(DenunciaSchema);

export class DenunciaDTO extends createZodDto(DenunciaSchema) {}
export class PartialDenunciaDTO extends createZodDto(PartialDenunciaSchema) {}

export const DenunciaValidator = createValidator(
  (data) => DenunciaSchema.parse(data),
  'Denuncias',
);

export const partialDenunciaValidator = createValidator(
  (data) => PartialDenunciaSchema.parse(data),
  'Denuncias',
);
