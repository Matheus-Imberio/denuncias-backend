import { assignClone } from 'src/shared/utils/object';
import { DEFAULT_ID } from 'src/shared/utils/test';
import { Endereco, EnderecoProps } from '../domain/endereco.entity';

const DEFAULT_PROPS: EnderecoProps = {
  cep: '00000-000',
  logradouro: 'Logradouro Exemplo',
  numero: '123',
  bairro: 'Jardim Exemplo',
  cidade: 'Cidade Exemplo',
  estado: 'Estado Exemplo',
  pais: 'Brasil',
};

export class EnderecoFactory {
  static create(props: Partial<EnderecoProps> = {}, id?: string) {
    return Endereco.create(
      assignClone(DEFAULT_PROPS, props),
      id ?? DEFAULT_ID,
    ).unwrapOrThrow();
  }
}
