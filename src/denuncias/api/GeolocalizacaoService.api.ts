import axios from 'axios';
import { HttpError } from 'src/@core/error.core';
import { fail, ResultAsync, success } from 'src/@core/result.core';
import { Endereco, EnderecoProps } from '../domain/endereco.entity';

interface ApiResponse {
  results?: Array<{
    components?: {
      postcode?: string;
      road?: string;
      street?: string;
      city?: string;
      town?: string;
      village?: string;
      state?: string;
      country_code?: string;
      suburb?: string;
      neighbourhood?: string;
      city_district?: string;
    };
  }>;
}

export class GeolocalizacaoService {
  private readonly apiKey = process.env.OPENCAGE_API_KEY;

  buscarEndereco(lat: number, lon: number): ResultAsync<Endereco, HttpError> {
    return ResultAsync.fromPromise(
      axios.get<ApiResponse>('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: `${lat},${lon}`,
          key: this.apiKey,
          language: 'pt-BR',
          countrycode: 'br',
        },
      }),
      () => new HttpError('Erro ao buscar endereço', 500),
    ).andThen((response) => {
      const result = response.data?.results?.[0];

      if (!result?.components) {
        return fail(new HttpError('Endereço não encontrado', 404));
      }

      const components = result.components;
      const enderecoProps: EnderecoProps = {
        cep: components.postcode ?? '00000000',
        logradouro: components.road ?? components.street ?? 'Desconhecida',
        numero: 'S/N',
        cidade: components.city ?? components.town ?? 'Desconhecida',
        estado: components.state ?? 'Desconhecido',
        bairro:
          components.suburb ??
          components.neighbourhood ??
          components.city_district ??
          components.village ??
          'Desconhecido',
        pais: components.country_code?.toUpperCase() ?? 'BR',
      };

      const enderecoOrError = Endereco.create(enderecoProps);
      if (enderecoOrError.wasFailure()) {
        return fail(enderecoOrError.data);
      }

      return success(enderecoOrError.data);
    });
  }
}
