import { HttpError } from 'src/@core/error.core';
import { fail, ResultAsync, success } from 'src/@core/result.core';
import { ExpectedResponse, UseCase } from 'src/@core/use-case.core';
import { DenunciaDTO, DenunciaValidator } from '../@types/denuncia.dto';
import { DenuncianteDTO } from '../@types/denunciante.dto';
import { GeolocalizacaoService } from '../api/GeolocalizacaoService.api';
import { Denuncia } from '../domain/denuncia.entity';
import { Denunciante } from '../domain/denunciante.entity';
import { Endereco } from '../domain/endereco.entity';
import { DenunciaMapper, DenunciaResponse } from '../mappers/denuncia.mapper';
import { DenunciaRepository } from '../repositories/denuncia.repository';
import { DenuncianteRepository } from '../repositories/denunciante.repository';
import { EnderecoRepository } from '../repositories/endereco.repository';

export type CreateDenunciaRequest = DenunciaDTO;
export type CreateDenunciaResponse = DenunciaResponse;

export class CreateDenunciaUseCase
  implements UseCase<CreateDenunciaRequest, CreateDenunciaResponse, HttpError>
{
  constructor(
    private readonly denunciaRepository: DenunciaRepository,
    private readonly denuncianteRepository: DenuncianteRepository,
    private readonly enderecoRepository: EnderecoRepository,
    private readonly geolocalizacaoService: GeolocalizacaoService,
  ) {}

  async execute(
    data: CreateDenunciaRequest,
  ): ExpectedResponse<CreateDenunciaResponse, HttpError> {
    const validation = DenunciaValidator(data);
    if (validation.wasFailure()) {
      return fail(new HttpError('Dados inválidos para denúncia', 400));
    }

    const validatedData = validation.data;
    const denuncianteResult = await this.processDenunciante(
      validatedData.denunciante,
    ).result();

    if (denuncianteResult.wasFailure()) {
      return fail(denuncianteResult.data);
    }

    const enderecoResult = await this.processEndereco(
      validatedData.endereco && typeof validatedData.endereco === 'object'
        ? (validatedData.endereco as { id?: string }).id
        : undefined,
      validatedData.endereco && typeof validatedData.endereco === 'object'
        ? (validatedData.endereco as { latitude?: number }).latitude
        : undefined,
      validatedData.endereco && typeof validatedData.endereco === 'object'
        ? (validatedData.endereco as { longitude?: number }).longitude
        : undefined,
    ).result();

    if (enderecoResult.wasFailure()) {
      return fail(enderecoResult.data);
    }

    const denunciaOrError = Denuncia.create({
      titulo: validatedData.titulo,
      descricao: validatedData.descricao,
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      denunciante: denuncianteResult.data,
      endereco: enderecoResult.data,
    });

    if (denunciaOrError.wasFailure()) {
      return fail(denunciaOrError.data);
    }
    return this.denunciaRepository
      .create(denunciaOrError.data)
      .map((denuncia) => DenunciaMapper.toResponse(denuncia))
      .result();
  }

  private processDenunciante(
    denuncianteData: DenuncianteDTO,
  ): ResultAsync<Denunciante, HttpError> {
    const identifier = denuncianteData.cpf;
    if (!identifier) {
      return ResultAsync.fromResult(
        fail(new HttpError('Identificador do denunciante não informado', 400)),
      );
    }

    return this.denuncianteRepository
      .findOne(identifier)
      .andThen((existing) => {
        if (existing) {
          return success(existing);
        }

        const denuncianteOrError = Denunciante.create(denuncianteData);
        if (denuncianteOrError.wasFailure()) {
          return fail(denuncianteOrError.data);
        }

        return this.denuncianteRepository.create(denuncianteOrError.data);
      });
  }

  private processEndereco(
    enderecoId?: string,
    latitude?: number,
    longitude?: number,
  ): ResultAsync<Endereco, HttpError> {
    if (enderecoId) {
      return this.enderecoRepository.findOne(enderecoId).andThen((existing) => {
        if (existing) {
          return ResultAsync.fromResult(success(existing));
        }

        if (latitude !== undefined && longitude !== undefined) {
          return this.geolocalizacaoService
            .buscarEndereco(latitude, longitude)

            .andThen((endereco) => this.enderecoRepository.create(endereco));
        }

        return ResultAsync.fromResult(
          fail(new HttpError('Endereço não encontrado', 404)),
        );
      });
    }

    if (latitude !== undefined && longitude !== undefined) {
      return this.geolocalizacaoService
        .buscarEndereco(latitude, longitude)
        .andThen((endereco) => this.enderecoRepository.create(endereco));
    }

    return ResultAsync.fromResult(
      fail(new HttpError('Endereço não encontrado', 404)),
    );
  }
}
