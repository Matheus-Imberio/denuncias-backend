import { assignClone } from 'src/shared/utils/object';
import { DEFAULT_ID } from 'src/shared/utils/test';
import { Denuncia, DenunciaProps } from '../domain/denuncia.entity';
import { Denunciante } from '../domain/denunciante.entity';
import { Endereco } from '../domain/endereco.entity';

const DEFAULT_PROPS: DenunciaProps = {
  titulo: 'Título Exemplo',
  descricao: 'Descrição de exemplo da denúncia.',
  latitude: 0,
  longitude: 0,
  denunciante: new Denunciante({
    nome: 'Denunciante Exemplo',
    cpf: '12345678901',
  }),
  endereco: new Endereco({
    logradouro: 'Rua Exemplo',
    numero: '123',
    bairro: 'Bairro Exemplo',
    cidade: 'Cidade Exemplo',
    estado: 'Estado Exemplo',
    cep: '12345678',
    pais: 'País Exemplo',
  }),
};

export class DenunciaFactory {
  static create(props: Partial<DenunciaProps> = {}, id?: string) {
    return Denuncia.create(
      assignClone(DEFAULT_PROPS, props),
      id ?? DEFAULT_ID,
    ).unwrapOrThrow();
  }
}
