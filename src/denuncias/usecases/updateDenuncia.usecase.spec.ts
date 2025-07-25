import { success } from 'src/@core/result.core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Denuncia } from '../domain/denuncia.entity';
import { Denunciante } from '../domain/denunciante.entity';
import { Endereco } from '../domain/endereco.entity';
import { UpdateDenunciaUseCase } from './updateDenuncia.usecase';

describe('UpdateDenunciaUseCase', () => {
  let useCase: UpdateDenunciaUseCase;
  let mockDenunciaRepository: any;
  let mockDenuncianteRepository: any;
  let mockEnderecoRepository: any;
  let mockGeolocalizacaoService: any;

  beforeEach(() => {
    // Mocks com implementações padrão (usando vi do Vitest)
    mockDenunciaRepository = {
      findById: vi.fn().mockResolvedValue(
        success(
          new Denuncia(
            {
              titulo: 'Título Original',
              descricao: 'Descrição Original',
              latitude: -23.5505,
              longitude: -46.6333,
              denunciante: new Denunciante({
                nome: 'Denunciante Original',
                cpf: '123.456.789-00',
              }),
              endereco: new Endereco({
                cep: '00000-000',
                logradouro: 'Rua Original',
                numero: '123',
                cidade: 'Cidade Original',
                estado: 'Estado Original',
              }),
            },
            '123',
          ),
        ),
      ),
      update: vi.fn().mockImplementation((d) => success(d)),
    };

    mockDenuncianteRepository = {
      findOne: vi.fn().mockResolvedValue(success(null)),
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
        id: '123',
        data: {
          titulo: 'Novo Título',
          descricao: 'Nova Descrição',
        },
      };

      const result = await useCase.execute(request);

      expect(result.wasSuccess()).toBe(true);
      if ('titulo' in result.data) {
        expect(result.data.titulo).toBe('Novo Título');
      }
      expect(mockDenunciaRepository.update).toHaveBeenCalled();
    });

    it('deve retornar erro 404 se denúncia não existir', async () => {
      mockDenunciaRepository.findById.mockResolvedValueOnce(success(null));

      const request = {
        id: '999',
        data: { titulo: 'Novo Título' },
      };

      const result = await useCase.execute(request);

      expect(result.wasFailure()).toBe(true);
      if ('statusCode' in result.data) {
        expect(result.data.statusCode).toBe(404);
      }
    });

    it('deve manter valores originais quando não fornecidos', async () => {
      const request = {
        id: '123',
        data: {
          descricao: 'Nova Descrição',
          // Não fornece título
        },
      };

      const result = await useCase.execute(request);

      expect(result.wasSuccess()).toBe(true);
      expect(result.data.titulo).toBe('Título Original');
      expect(result.data.descricao).toBe('Nova Descrição');
    });
  });
});