import { Entity } from 'src/@core/entity.core';
import { HttpError } from 'src/@core/error.core';
import { Result, success } from 'src/@core/result.core';

export interface DenuncianteProps {
  nome: string;
  cpf: string;
}

export class Denunciante extends Entity<DenuncianteProps> {
  constructor(props: DenuncianteProps, id?: string) {
    super(props, id);
  }

  get nome(): string {
    return this.props.nome;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  static create(
    props: DenuncianteProps,
    id?: string,
  ): Result<Denunciante, HttpError> {
    return success(new Denunciante(props, id));
  }
}
