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

export type UpdateDenunciaRequest = {
  id: string;
  data: Partial<DenunciaDTO>;
};
export type UpdateDenunciaResponse = DenunciaResponse;

export class UpdateDenunciaUseCase
  implements UseCase<UpdateDenunciaRequest, UpdateDenunciaResponse, HttpError>
{
  constructor(
    private readonly denunciaRepository: DenunciaRepository,
    private readonly denuncianteRepository: DenuncianteRepository,
    private readonly enderecoRepository: EnderecoRepository,
    private readonly geolocalizacaoService: GeolocalizacaoService,
  ) {}

  async execute(
    request: UpdateDenunciaRequest,
  ): ExpectedResponse<UpdateDenunciaResponse, HttpError> {
    console.log(
      'Executing UpdateDenunciaUseCase with request:',
      this.denunciaRepository.findOne(request.id),
    );

    const currentDenuncia = await this.denunciaRepository.findOne(request.id)
      ?.data;
    if (!currentDenuncia) {
      return fail(new HttpError('Denúncia não encontrada', 404));
    }
    const validation = DenunciaValidator(request.data);
    if (validation.wasFailure()) {
      return fail(new HttpError('Dados inválidos para denúncia', 400));
    }

    const validatedData = validation.data;

    // 3. Processamento do Denunciante (se fornecido)
    let denunciante = currentDenuncia.denunciante;
    if (validatedData.denunciante) {
      const denuncianteResult = await this.processDenunciante(
        validatedData.denunciante,
      ).result();

      if (denuncianteResult.wasFailure()) {
        return fail(denuncianteResult.data);
      }
      denunciante = denuncianteResult.data;
    }

    // 4. Processamento do Endereço (se fornecido)
    let endereco = currentDenuncia.endereco;
    if (
      validatedData.endereco ||
      validatedData.latitude ||
      validatedData.longitude
    ) {
      const enderecoResult = await this.processEndereco(
        validatedData.endereco && typeof validatedData.endereco === 'object'
          ? (validatedData.endereco as { id?: string }).id
          : undefined,
      ).result();

      if (enderecoResult.wasFailure()) {
        return fail(enderecoResult.data);
      }
      endereco = enderecoResult.data;
    }

    // 5. Atualização da Denúncia
    const updatedProps = {
      titulo: validatedData.titulo ?? currentDenuncia.titulo,
      descricao: validatedData.descricao ?? currentDenuncia.descricao,
      denunciante,
      endereco,
    };

    const updatedDenunciaOrError = Denuncia.create(
      updatedProps,
      currentDenuncia.id,
    );

    if (updatedDenunciaOrError.wasFailure()) {
      return fail(updatedDenunciaOrError.data);
    }

    // 6. Persistência e retorno
    return this.denunciaRepository
      .update(updatedDenunciaOrError.data)
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
