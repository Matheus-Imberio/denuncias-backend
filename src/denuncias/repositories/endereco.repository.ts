import { HttpError } from 'src/@core/error.core';
import { ResultAsync } from 'src/@core/result.core';
import { Endereco } from '../domain/endereco.entity';

export abstract class EnderecoRepository {
  abstract create(endereco: Endereco): ResultAsync<Endereco, HttpError>;
  abstract findAll(): ResultAsync<Endereco[], HttpError>;
  abstract findOne(id: string): ResultAsync<Endereco, HttpError>;
  abstract update(endereco: Endereco): ResultAsync<Endereco, HttpError>;
  abstract remove(id: string): ResultAsync<null, HttpError>;
}
