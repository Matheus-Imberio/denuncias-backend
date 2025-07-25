import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DenunciaMapper } from '../mappers/denuncia.mapper';
import { DenunciaRepository } from '../repositories/denuncia.repository';
import { InMemoryDenunciaRepository } from '../repositories/in-memory-denuncia.repository';
import { DenunciaFactory } from '../tests/denuncia.factory';
import { GetDenunciasUseCase } from './getDenuncias.usecase';

describe('[unit] test get denuncias usecase', () => {
  let denunciaRepository: DenunciaRepository;
  let useCase: GetDenunciasUseCase;

  beforeEach(() => {
    denunciaRepository = new InMemoryDenunciaRepository();
    useCase = new GetDenunciasUseCase(denunciaRepository);
  });

  afterEach(() => {
    // @ts-expect-error - Não faz sentido incluir null na tipagem.
    denunciaRepository = null;
    // @ts-expect-error - Não faz sentido incluir null na tipagem.
    useCase = null;

    vi.clearAllMocks();
  });

  it('should get all denuncias', async () => {
    const denuncias = Array.from({ length: 5 }, () => DenunciaFactory.create());

    for (const denuncia of denuncias) {
      denunciaRepository.create(denuncia);
    }

    const result = await useCase.execute();

    expect(result.wasSuccess()).toBeTruthy();
    expect(result.unwrapOrThrow()).toStrictEqual(
      denuncias.map((denuncia) => DenunciaMapper.toResponse(denuncia)),
    );
  });
});
