import { denuncias as PersistentDenuncia } from '@prisma/client';
import { PickRequired } from 'src/shared/utils/types';
import { Denuncia } from '../domain/denuncia.entity';

export type DenunciaResponse = PickRequired<
  Denuncia,
  'id' | 'titulo' | 'descricao'
>;
type NormalizedDenuncia = Omit<
  PersistentDenuncia,
  'id' | 'created_at' | 'denunciante_id' | 'endereco_id'
>;

export class DenunciaMapper {
  static toDomain(denuncia: PersistentDenuncia): Denuncia {
    return new Denuncia(
      {
        titulo: denuncia.titulo,
        descricao: denuncia.descricao,
        latitude: denuncia.latitude,
        longitude: denuncia.longitude,
      },
      denuncia.id,
    );
  }

  static toPersist(denuncia: Denuncia): NormalizedDenuncia {
    return {
      titulo: denuncia.titulo,
      descricao: denuncia.descricao,
      updated_at: new Date(),
      latitude: denuncia.latitude,
      longitude: denuncia.longitude,
    };
  }

  static toResponse(denuncia: Denuncia): DenunciaResponse {
    return {
      id: denuncia.id!,
      titulo: denuncia.titulo,
      descricao: denuncia.descricao,
    };
  }
}
