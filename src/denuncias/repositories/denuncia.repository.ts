import { HttpError } from 'src/@core/error.core';
import { ResultAsync } from 'src/@core/result.core';
import { Denuncia } from '../domain/denuncia.entity';

export abstract class DenunciaRepository {
  abstract create(denuncia: Denuncia): ResultAsync<Denuncia, HttpError>;
  abstract findAll(): ResultAsync<Denuncia[], HttpError>;
  abstract findOne(id: string): ResultAsync<Denuncia, HttpError>;
  abstract update(denuncia: Denuncia): ResultAsync<Denuncia, HttpError>;
  abstract remove(id: string): ResultAsync<null, HttpError>;
}
