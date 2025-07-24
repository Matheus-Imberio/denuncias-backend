import { enderecos as PersistentEndereco } from '@prisma/client';
import { Endereco } from '../domain/endereco.entity';

export type EnderecoResponse = {
  id: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

type NormalizedEndereco = Omit<PersistentEndereco, 'id' | 'created_at'>;

export class EnderecoMapper {
  static toDomain(endereco: PersistentEndereco): Endereco {
    return new Endereco(
      {
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        bairro: endereco.jardim,
        cidade: endereco.cidade,
        estado: endereco.estado,
        cep: endereco.cep,
      },
      endereco.id,
    );
  }
  static toPersist(endereco: Endereco): NormalizedEndereco {
    return {
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      jardim: endereco.bairro!,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep,
      pais: endereco.pais!,
      updated_at: new Date(),
    };
  }

  static toResponse(endereco: Endereco): EnderecoResponse {
    return {
      id: endereco.id!,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      bairro: endereco.bairro!,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep,
    };
  }
}
