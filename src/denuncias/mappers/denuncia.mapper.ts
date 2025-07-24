import { denuncia as PersistentDenuncia } from '@prisma/client';
import { PickRequired } from 'src/shared/utils/types';
import { Denuncia } from '../domain/denuncia.entity';

export type DenunciaResponse = PickRequired<
  Denuncia,
  'id' | 'titulo' | 'descricao'
>;
type NormalizedDenuncia = Omit<PersistentDenuncia, 'id' | 'created_at'>;

export class DenunciaMapper {
  static toDomain(denuncia: PersistentDenuncia): Denuncia {
    return new Denuncia(
      {
        titulo: denuncia.titulo,
        descricao: denuncia.descricao,
        latitude: denuncia.latitude,
        longitude: denuncia.longitude,
        denunciante_id: denuncia.denunciante_id,
        endereco_id: denuncia.endereco_id,
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
      denunciante_id: denuncia.props.denunciante_id,
      endereco_id: denuncia.props.endereco_id,
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
