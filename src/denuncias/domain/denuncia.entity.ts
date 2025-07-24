import { Entity } from 'src/@core/entity.core';
import { HttpError } from 'src/@core/error.core';
import { Result, success } from 'src/@core/result.core';

export interface DenunciaProps {
  titulo: string;
  descricao: string;
  latitude: number;
  longitude: number;
  denunciante_id: string;
  endereco_id: string;
}

export class Denuncia extends Entity<DenunciaProps> {
  constructor(props: DenunciaProps, id?: string) {
    super(props, id);
  }

  get titulo(): string {
    return this.props.titulo;
  }

  get descricao(): string {
    return this.props.descricao;
  }

  get latitude(): number {
    return this.props.latitude;
  }

  get longitude(): number {
    return this.props.longitude;
  }

  get denunciante_id(): string {
    return this.props.denunciante_id;
  }

  get endereco_id(): string {
    return this.props.endereco_id;
  }

  static create(
    props: DenunciaProps,
    id?: string,
  ): Result<Denuncia, HttpError> {
    return success(new Denuncia(props, id));
  }
}
