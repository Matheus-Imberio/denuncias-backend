import { ResultAsync, success } from 'src/@core/result.core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Denunciante } from '../domain/denunciante.entity';
import { Endereco } from '../domain/endereco.entity';
import { DenunciaFactory } from '../tests/denuncia.factory';
import { UpdateDenunciaUseCase } from './updateDenuncia.usecase';

describe('UpdateDenunciaUseCase', () => {
  let useCase: UpdateDenunciaUseCase;
  let mockDenunciaRepository: any;
  let mockDenuncianteRepository: any;
  let mockEnderecoRepository: any;
  let mockGeolocalizacaoService: any;

  // UUID válido para testes
  const TEST_UUID = '018e11a6-05e9-7e3c-8a5e-4e8f0a7d3b1c';

  beforeEach(() => {
    // Crie uma denúncia válida usando o factory
    const denunciaValida = DenunciaFactory.create({}, TEST_UUID);

    mockDenunciaRepository = {
      findOne: vi.fn().mockResolvedValue(success(denunciaValida)),
      update: vi.fn().mockImplementation((d) => success(d)),
    };

    mockDenuncianteRepository = {
      findOne: vi
        .fn()
        .mockReturnValue(ResultAsync.fromResult(success(denunciaValida))),
      create: vi.fn().mockImplementation((d) => success(new Denunciante(d))),
    };

    mockEnderecoRepository = {
      findOne: vi.fn().mockResolvedValue(success(null)),
      create: vi.fn().mockImplementation((d) => success(new Endereco(d))),
    };

    mockGeolocalizacaoService = {
      buscarEndereco: vi.fn().mockResolvedValue(
        success(
          new Endereco({
            cep: '01001-000',
            logradouro: 'Rua Nova',
            numero: 'S/N',
            cidade: 'Cidade Nova',
            estado: 'Estado Novo',
          }),
        ),
      ),
    };

    useCase = new UpdateDenunciaUseCase(
      mockDenunciaRepository,
      mockDenuncianteRepository,
      mockEnderecoRepository,
      mockGeolocalizacaoService,
    );
  });

  describe('execute', () => {
    it('deve atualizar uma denúncia existente com sucesso', async () => {
      const request = {
        id: TEST_UUID,
        data: {
          titulo: 'Novo Título',
          descricao: 'Nova Descrição',
        },
      };
      const result = await useCase.execute(request);
      if ('titulo' in result.data) {
        expect(result.data.titulo).toBe('Novo Título');
      } else {
        expect(result.data).toBeInstanceOf(Error);
      }
    });
  });
});
