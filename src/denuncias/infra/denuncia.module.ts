import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { injectPrisma, provideUseCase } from 'src/shared/lib/nest/utils';

import { DenunciaRepository } from '../repositories/denuncia.repository';
import { PrismaDenunciaRepository } from '../repositories/prisma-denuncia.repository';

import { DenuncianteRepository } from '../repositories/denunciante.repository';
import { PrismaDenuncianteRepository } from '../repositories/prisma-denunciante.repository';

import { EnderecoRepository } from '../repositories/endereco.repository';
import { PrismaEnderecoRepository } from '../repositories/prisma-endereco.repository';

import { GeolocalizacaoService } from '../api/GeolocalizacaoService.api';
import { CreateDenunciaUseCase } from '../usecases/createDenuncia.usecase';
import { DeleteDenunciaUseCase } from '../usecases/deleteDenuncia.usecase';
import { GetDenunciaByIdUseCase } from '../usecases/getDenunciaById.usecase';
import { GetDenunciasUseCase } from '../usecases/getDenuncias.usecase';
import { UpdateDenunciaUseCase } from '../usecases/updateDenuncia.usecase';
import { DenunciaController } from './denuncia.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DenunciaController],
  providers: [
    // Repositórios
    injectPrisma(DenunciaRepository, PrismaDenunciaRepository),
    injectPrisma(DenuncianteRepository, PrismaDenuncianteRepository),
    injectPrisma(EnderecoRepository, PrismaEnderecoRepository),

    // Serviços
    GeolocalizacaoService,

    // UseCases com múltiplas dependências
    {
      provide: CreateDenunciaUseCase,
      useFactory: (
        denunciaRepo: DenunciaRepository,
        denuncianteRepo: DenuncianteRepository,
        enderecoRepo: EnderecoRepository,
        geoService: GeolocalizacaoService,
      ) =>
        new CreateDenunciaUseCase(
          denunciaRepo,
          denuncianteRepo,
          enderecoRepo,
          geoService,
        ),
      inject: [
        DenunciaRepository,
        DenuncianteRepository,
        EnderecoRepository,
        GeolocalizacaoService,
      ],
    },
    {
      provide: UpdateDenunciaUseCase,
      useFactory: (
        denunciaRepo: DenunciaRepository,
        denuncianteRepo: DenuncianteRepository,
        enderecoRepo: EnderecoRepository,
        geoService: GeolocalizacaoService,
      ) =>
        new UpdateDenunciaUseCase(
          denunciaRepo,
          denuncianteRepo,
          enderecoRepo,
          geoService,
        ),
      inject: [
        DenunciaRepository,
        DenuncianteRepository,
        EnderecoRepository,
        GeolocalizacaoService,
      ],
    },

    // Outros UseCases simples
    provideUseCase(GetDenunciaByIdUseCase, DenunciaRepository),
    provideUseCase(GetDenunciasUseCase, DenunciaRepository),
    provideUseCase(DeleteDenunciaUseCase, DenunciaRepository),
  ],
})
export class DenunciaModule {}
