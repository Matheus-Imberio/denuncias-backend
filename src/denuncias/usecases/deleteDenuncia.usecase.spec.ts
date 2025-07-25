import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DenunciaRepository } from '../repositories/denuncia.repository';
import { InMemoryDenunciaRepository } from '../repositories/in-memory-denuncia.repository';
import { DenunciaFactory } from '../tests/denuncia.factory';
import { CreateDenunciaUseCase } from './createDenuncia.usecase';
import { DeleteDenunciaUseCase } from './deleteDenuncia.usecase';

describe('[unit] DeleteDenunciaUseCase', () => {
  let denunciaRepository: DenunciaRepository;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let createUseCase: CreateDenunciaUseCase;
  let deleteUseCase: DeleteDenunciaUseCase;

  beforeEach(() => {
    denunciaRepository = new InMemoryDenunciaRepository();
    createUseCase = new CreateDenunciaUseCase(
      denunciaRepository,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      {} as any, // mocks para os repositórios não usados nesse teste
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      {} as any,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      {} as any,
    );
    deleteUseCase = new DeleteDenunciaUseCase(denunciaRepository);
  });

  afterEach(() => {
    // @ts-expect-error - Não faz sentido incluir null na tipagem.
    denunciaRepository = null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    createUseCase = null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    deleteUseCase = null;

    vi.clearAllMocks();
  });

  it('deve deletar uma denúncia com sucesso', async () => {
    const denuncia = DenunciaFactory.create();
    denunciaRepository.create(denuncia);

    const result = await deleteUseCase.execute(denuncia.id!);
    expect(result.wasSuccess()).toBe(true);
  });
});
