import { Prisma } from '@prisma/client';
import { PickRequired } from 'src/shared/utils/types';
import { Denuncia } from '../domain/denuncia.entity';
import { Denunciante } from '../domain/denunciante.entity';
import { Endereco } from '../domain/endereco.entity';

type PersistentDenuncia = Prisma.denunciaGetPayload<{
  include: {
    denunciante: true;
    endereco: true;
  };
}>;

export type DenunciaResponse = PickRequired<
  Denuncia,
  'id' | 'titulo' | 'descricao'
>;
type NormalizedDenuncia = Omit<
  PersistentDenuncia,
  'id' | 'created_at' | 'endereco' | 'denunciante'
>;

export class DenunciaMapper {
  static toDomain(denuncia: PersistentDenuncia): Denuncia {
    const denunciante = denuncia.denunciante
      ? new Denunciante(
          {
            nome: denuncia.denunciante.nome,
            cpf: denuncia.denunciante.cpf,
          },
          denuncia.denunciante.id,
        )
      : undefined;

    const endereco = denuncia.endereco
      ? new Endereco(
          {
            logradouro: denuncia.endereco.logradouro,
            numero: denuncia.endereco.numero,
            bairro: denuncia.endereco.bairro,
            cidade: denuncia.endereco.cidade,
            estado: denuncia.endereco.estado,
            cep: denuncia.endereco.cep,
            pais: denuncia.endereco.pais,
          },
          denuncia.endereco.id,
        )
      : undefined;

    return new Denuncia(
      {
        titulo: denuncia.titulo,
        descricao: denuncia.descricao,
        latitude: denuncia.latitude,
        longitude: denuncia.longitude,
        denunciante,
        endereco,
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
      denunciante_id: denuncia.props.denunciante!.id!,
      endereco_id: denuncia.props.endereco!.id!,
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
