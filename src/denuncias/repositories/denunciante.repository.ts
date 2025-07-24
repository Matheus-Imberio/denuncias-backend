import { HttpError } from 'src/@core/error.core';
import { ResultAsync } from 'src/@core/result.core';
import { Denunciante } from '../domain/denunciante.entity';

export abstract class DenuncianteRepository {
  abstract create(
    denunciante: Denunciante,
  ): ResultAsync<Denunciante, HttpError>;
  abstract findAll(): ResultAsync<Denunciante[], HttpError>;
  abstract findOne(id: string): ResultAsync<Denunciante, HttpError>;
  abstract update(
    denunciante: Denunciante,
  ): ResultAsync<Denunciante, HttpError>;
  abstract remove(id: string): ResultAsync<null, HttpError>;
}
