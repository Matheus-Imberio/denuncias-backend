import { ExpectedResponse, UseCase } from 'src/@core/use-case.core';
import { DenunciaRepository } from '../repositories/denuncia.repository';

export type DeleteDenunciaResponse = null;

export class DeleteDenunciaUseCase implements UseCase {
  constructor(private readonly denunciaRepository: DenunciaRepository) {}

  async execute(id: string): ExpectedResponse<DeleteDenunciaResponse> {
    return this.denunciaRepository
      .remove(id)
      .map(() => null)
      .result();
  }
}
