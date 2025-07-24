import { assignClone } from 'src/shared/utils/object';
import { DEFAULT_ID } from 'src/shared/utils/test';
import { Denuncia, DenunciaProps } from '../domain/denuncia.entity';

const DEFAULT_PROPS: DenunciaProps = {
  titulo: 'Título Exemplo',
  descricao: 'Descrição de exemplo da denúncia.',
  latitude: 0, // default latitude value
  longitude: 0, // default longitude value
};

export class DenunciaFactory {
  static create(props: Partial<DenunciaProps> = {}, id?: string) {
    return Denuncia.create(
      assignClone(DEFAULT_PROPS, props),
      id ?? DEFAULT_ID,
    ).unwrapOrThrow();
  }
}
