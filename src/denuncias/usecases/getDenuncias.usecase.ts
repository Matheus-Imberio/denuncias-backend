import { ExpectedResponse, UseCase } from 'src/@core/use-case.core';
import { DenunciaMapper, DenunciaResponse } from '../mappers/denuncia.mapper';
import { DenunciaRepository } from '../repositories/denuncia.repository';

export type GetDenunciasResponse = DenunciaResponse[];

export class GetDenunciasUseCase implements UseCase {
  constructor(private readonly denunciaRepository: DenunciaRepository) {}

  async execute(): ExpectedResponse<GetDenunciasResponse> {
    return this.denunciaRepository
      .findAll()
      .map((denuncia) => denuncia.map((d) => DenunciaMapper.toResponse(d)))
      .result();
  }
}
