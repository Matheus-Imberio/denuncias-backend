import { assignClone } from 'src/shared/utils/object';
import { DEFAULT_ID } from 'src/shared/utils/test';
import { Denunciante, DenuncianteProps } from '../domain/denunciante.entity';

const DEFAULT_PROPS: DenuncianteProps = {
  nome: 'Nome Exemplo',
  cpf: '00000000000',
};

export class DenuncianteFactory {
  static create(props: Partial<DenuncianteProps> = {}, id?: string) {
    return Denunciante.create(
      assignClone(DEFAULT_PROPS, props),
      id ?? DEFAULT_ID,
    ).unwrapOrThrow();
  }
}
