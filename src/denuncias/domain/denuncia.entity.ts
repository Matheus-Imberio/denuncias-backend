import { Entity } from 'src/@core/entity.core';
import { HttpError } from 'src/@core/error.core';
import { Result, success } from 'src/@core/result.core';

export interface DenunciaProps {
  titulo: string;
  descricao: string;
  denunciante_id: string;
}

export class Denuncia extends Entity<DenunciaProps> {
  private constructor(props: DenunciaProps, id?: string) {
    super(props, id);
  }

  get titulo(): string {
    return this.props.titulo;
  }

  get descricao(): string {
    return this.props.descricao;
  }

  get denuncianteId(): string {
    return this.props.denunciante_id;
  }

  static create(
    props: DenunciaProps,
    id?: string,
  ): Result<Denuncia, HttpError> {
    return success(new Denuncia(props, id));
  }
}
