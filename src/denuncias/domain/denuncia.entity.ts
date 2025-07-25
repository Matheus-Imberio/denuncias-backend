import { Entity } from 'src/@core/entity.core';
import { HttpError } from 'src/@core/error.core';
import { Result, success } from 'src/@core/result.core';
import { Denunciante } from './denunciante.entity';
import { Endereco } from './endereco.entity';

export interface DenunciaProps {
  titulo: string;
  descricao: string;
  latitude: number;
  longitude: number;
  denunciante?: Denunciante;
  endereco?: Endereco;
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

  get denunciante(): Denunciante | undefined {
    return this.props.denunciante;
  }

  get endereco(): Endereco | undefined {
    return this.props.endereco;
  }

  static create(
    props: DenunciaProps,
    id?: string,
  ): Result<Denuncia, HttpError> {
    return success(new Denuncia(props, id));
  }
}
