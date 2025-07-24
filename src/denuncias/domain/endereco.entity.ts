import { Entity } from 'src/@core/entity.core';
import { HttpError } from 'src/@core/error.core';
import { Result, success } from 'src/@core/result.core';

export interface EnderecoProps {
  cep: string;
  logradouro: string;
  numero: string;
  bairro?: string;
  cidade: string;
  estado: string;
  pais?: string;
}

export class Endereco extends Entity<EnderecoProps> {
  constructor(props: EnderecoProps, id?: string) {
    super(props, id);
  }

  get cep(): string {
    return this.props.cep;
  }

  get logradouro(): string {
    return this.props.logradouro;
  }

  get numero(): string {
    return this.props.numero;
  }

  get bairro(): string | undefined {
    return this.props.bairro;
  }

  get cidade(): string {
    return this.props.cidade;
  }

  get estado(): string {
    return this.props.estado;
  }

  get pais(): string | undefined {
    return this.props.pais;
  }

  static create(
    props: EnderecoProps,
    id?: string,
  ): Result<Endereco, HttpError> {
    return success(new Endereco(props, id));
  }
}
