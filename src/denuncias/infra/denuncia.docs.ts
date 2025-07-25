import { HttpStatus } from '@nestjs/common';
import { Option } from 'src/shared/lib/swagger/DocumentMethod';
import { DocKeys } from 'src/shared/utils/docs';
import { DenunciaDTO } from '../@types/denuncia.dto';
import { denunciaErrorSchema } from '../errors/denuncia.error';
import { DenunciaMapper } from '../mappers/denuncia.mapper';

export const DenunciaSuccess: DocKeys<typeof DenunciaMapper.toResponse> = {
  id: 'Identificador da denúncia',
  titulo: 'Título da denúncia',
  descricao: 'Descrição da denúncia',
  denunciante: {
    id: 'Identificador do denunciante',
    nome: 'Nome do denunciante',
    cpf: 'CPF do denunciante',
  },
  endereco: {
    id: 'Identificador do endereço',
    logradouro: 'Logradouro do endereço',
    numero: 'Número do endereço',
    bairro: 'Bairro do endereço',
    cidade: 'Cidade do endereço',
    estado: 'Estado do endereço',
    cep: 'CEP do endereço',
    pais: 'País do endereço',
  },
  latitude: 'Latitude da denúncia',
  longitude: 'Longitude da denúncia',
};

export const GetDenunciaByIdDocumentationObject: Option = {
  summary: 'Retorna uma denúncia pelo id',
  description: 'Busca uma denúncia com base em seu id e a retorna',
  responses: {
    success: [
      {
        status: HttpStatus.OK,
        description: 'Retorna uma denúncia',
        examples: {
          'success response': {
            statusCode: HttpStatus.OK,
            data: DenunciaSuccess,
          },
        },
      },
    ],
    fail: [
      {
        status: denunciaErrorSchema('notFound').statusCode,
        description: 'Denúncia não encontrada',
        examples: {
          notFound: denunciaErrorSchema('notFound'),
        },
      },
    ],
  },
};

export const GetDenunciasDocumentationObject: Option = {
  summary: 'Retorna todas as denúncias.',
  description: 'Retorna uma lista contendo todas as denúncias',
  responses: {
    success: [
      {
        status: HttpStatus.OK,
        description: 'Retorna todas as denúncias.',
        examples: {
          'success response': {
            statusCode: HttpStatus.OK,
            data: [DenunciaSuccess],
          },
        },
      },
    ],
    fail: [],
  },
};

export const CreateDenunciaDocumentationObject: Option = {
  summary: 'Cria uma nova denúncia',
  description:
    'Cria uma nova denúncia no banco de dados com base nos dados passados',
  body: {
    type: DenunciaDTO,
  },
  responses: {
    success: [
      {
        status: HttpStatus.CREATED,
        description: 'Cria uma nova denúncia',
        examples: {
          'success response': {
            statusCode: HttpStatus.CREATED,
            data: DenunciaSuccess,
          },
        },
      },
    ],
    fail: [
      {
        status: denunciaErrorSchema('alreadyExists').statusCode,
        description:
          'Erro ao criar uma denúncia. Veja os exemplos de erros possíveis.',
        examples: {
          alreadyExists: denunciaErrorSchema('alreadyExists'),
        },
      },
    ],
  },
};

export const UpdateDenunciaDocumentationObject: Option = {
  summary: 'Atualiza uma denúncia',
  description:
    'Busca por uma denúncia existente via id e atualiza seus valores com base nos dados passados',
  body: {
    type: DenunciaDTO,
  },
  responses: {
    success: [
      {
        status: HttpStatus.OK,
        description: 'Atualiza uma denúncia',
        examples: {
          'success response': {
            statusCode: HttpStatus.OK,
            data: DenunciaSuccess,
          },
        },
      },
    ],
    fail: [
      {
        status: HttpStatus.BAD_REQUEST,
        description:
          'Erro ao atualizar uma denúncia. Veja os exemplos de erros possíveis.',
        examples: {
          notFound: denunciaErrorSchema('notFound'),
          alreadyExists: denunciaErrorSchema('alreadyExists'),
        },
      },
    ],
  },
};

export const DeleteDenunciaDocumentationObject: Option = {
  summary: 'Remove uma denúncia',
  description:
    'Busca por uma denúncia existente via id e a remove do banco de dados.',
  responses: {
    success: [
      {
        status: HttpStatus.NO_CONTENT,
        description: 'Remove uma denúncia',
        examples: {
          'success response': {
            statusCode: HttpStatus.NO_CONTENT,
            data: [null],
          },
        },
      },
    ],
    fail: [
      {
        status: denunciaErrorSchema('notFound').statusCode,
        description: 'Erro ao remover uma denúncia',
        examples: {
          notFound: denunciaErrorSchema('notFound'),
        },
      },
    ],
  },
};
