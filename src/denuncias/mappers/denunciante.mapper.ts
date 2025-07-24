import { denunciante as PersistentDenunciante } from '@prisma/client';
import { PickRequired } from 'src/shared/utils/types';
import { Denunciante } from '../domain/denunciante.entity';

export type DenuncianteResponse = PickRequired<
  Denunciante,
  'id' | 'nome' | 'cpf'
>;
type NormalizedDenunciante = Omit<PersistentDenunciante, 'id' | 'created_at'>;

export class DenuncianteMapper {
  static toDomain(denunciante: PersistentDenunciante): Denunciante {
    return new Denunciante(
      {
        nome: denunciante.nome,
        cpf: denunciante.cpf,
      },
      denunciante.id,
    );
  }

  static toPersist(denunciante: Denunciante): NormalizedDenunciante {
    return {
      nome: denunciante.nome,
      cpf: denunciante.cpf,
      updated_at: new Date(),
    };
  }

  static toResponse(denunciante: Denunciante): DenuncianteResponse {
    return {
      id: denunciante.id!,
      nome: denunciante.nome,
      cpf: denunciante.cpf,
    };
  }
}
