import { ResultAsync, success } from 'src/@core/result.core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GeolocalizacaoService } from '../api/GeolocalizacaoService.api';
import { DenunciaMapper } from '../mappers/denuncia.mapper';
import { DenunciaRepository } from '../repositories/denuncia.repository';
import { DenuncianteRepository } from '../repositories/denunciante.repository';
import { EnderecoRepository } from '../repositories/endereco.repository';
import { DenunciaFactory } from '../tests/denuncia.factory';
import { DenuncianteFactory } from '../tests/denunciante.factory';
import { EnderecoFactory } from '../tests/endereco.factory';
import { CreateDenunciaUseCase } from './createDenuncia.usecase';

describe('[unit] CreateDenunciaUseCase > deve criar uma denúncia com sucesso', () => {
  let denunciaRepository: DenunciaRepository;
  let denuncianteRepository: DenuncianteRepository;
  let enderecoRepository: EnderecoRepository;
  let geolocalizacaoService: GeolocalizacaoService;
  let useCase: CreateDenunciaUseCase;

  let denunciante: ReturnType<typeof DenuncianteFactory.create>;
  let endereco: ReturnType<typeof EnderecoFactory.create>;
  let denuncia: ReturnType<typeof DenunciaFactory.create>;

  beforeEach(() => {
    denunciante = DenuncianteFactory.create();
    endereco = EnderecoFactory.create();
    denuncia = DenunciaFactory.create({ denunciante, endereco });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    denuncianteRepository = {
      findOne: vi
        .fn()
        .mockReturnValue(ResultAsync.fromResult(success(undefined))),
      create: vi
        .fn()
        .mockReturnValue(ResultAsync.fromResult(success(denunciante))),
    } as any;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    enderecoRepository = {
      findOne: vi
        .fn()
        .mockReturnValue(ResultAsync.fromResult(success(undefined))),
      create: vi
        .fn()
        .mockReturnValue(ResultAsync.fromResult(success(endereco))),
    } as any;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    denunciaRepository = {
      create: vi
        .fn()
        .mockReturnValue(ResultAsync.fromResult(success(denuncia))),
    } as any;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    geolocalizacaoService = {
      buscarEndereco: vi
        .fn()
        .mockReturnValue(ResultAsync.fromResult(success(endereco))),
    } as any;

    useCase = new CreateDenunciaUseCase(
      denunciaRepository,
      denuncianteRepository,
      enderecoRepository,
      geolocalizacaoService,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar uma denúncia com sucesso', async () => {
    const request = {
      titulo: denuncia.titulo,
      descricao: denuncia.descricao,
      latitude: denuncia.latitude,
      longitude: denuncia.longitude,
      denunciante: {
        nome: denunciante.nome,
        cpf: denunciante.cpf,
      },
      endereco: {
        latitude: denuncia.latitude,
        longitude: denuncia.longitude,
      },
    };

    const result = await useCase.execute(request);

    expect(result.wasSuccess()).toBe(true);
    expect(result.data).toEqual(DenunciaMapper.toResponse(denuncia));
  });
});
