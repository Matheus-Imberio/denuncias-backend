import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DenunciaMapper } from '../mappers/denuncia.mapper';
import { DenunciaRepository } from '../repositories/denuncia.repository';
import { InMemoryDenunciaRepository } from '../repositories/in-memory-denuncia.repository';
import { DenunciaFactory } from '../tests/denuncia.factory';
import { GetDenunciaByIdUseCase } from './getDenunciaById.usecase';

describe('[unit] test get denuncia usecase', () => {
  let denunciaRepository: DenunciaRepository;
  let useCase: GetDenunciaByIdUseCase;

  beforeEach(() => {
    denunciaRepository = new InMemoryDenunciaRepository();
    useCase = new GetDenunciaByIdUseCase(denunciaRepository);
  });

  afterEach(() => {
    // @ts-expect-error - Não faz sentido incluir null na tipagem.
    denunciaRepository = null;
    // @ts-expect-error - Não faz sentido incluir null na tipagem.
    useCase = null;

    vi.clearAllMocks();
  });

  it('should get a denuncia', async () => {
    const denuncia = DenunciaFactory.create();
    denunciaRepository.create(denuncia);

    const result = await useCase.execute(denuncia.id!);

    expect(result.wasSuccess()).toBeTruthy();
    expect(result.unwrapOrThrow()).toStrictEqual(
      DenunciaMapper.toResponse(denuncia),
    );
  });
});
