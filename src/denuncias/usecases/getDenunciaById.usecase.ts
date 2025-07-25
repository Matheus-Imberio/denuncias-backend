import { ExpectedResponse, UseCase } from 'src/@core/use-case.core';
import { DenunciaMapper, DenunciaResponse } from '../mappers/denuncia.mapper';
import { DenunciaRepository } from '../repositories/denuncia.repository';

export type GetDenunciaResponse = DenunciaResponse;

export class GetDenunciaByIdUseCase implements UseCase {
  constructor(private readonly denunciaRepository: DenunciaRepository) {}

  async execute(id: string): ExpectedResponse<GetDenunciaResponse> {
    return (
      this.denunciaRepository
        .findOne(id)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        .map(DenunciaMapper.toResponse)
        .result()
    );
  }
}
