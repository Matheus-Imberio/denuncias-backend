import { PrismaService } from 'prisma/prisma.service';
import { HttpError } from 'src/@core/error.core';
import { fail, ResultAsync, success } from 'src/@core/result.core';
import { Denunciante } from '../domain/denunciante.entity';
import { DenuncianteMapper } from '../mappers/denunciante.mapper';
import { DenuncianteRepository } from './denunciante.repository';

export class PrismaDenuncianteRepository implements DenuncianteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(denunciante: Denunciante) {
    const data = DenuncianteMapper.toPersist(denunciante);

    return ResultAsync.fromPromiseHttp(
      this.prismaService.denunciante.create({ data }),
    ).map((created) => DenuncianteMapper.toDomain(created));
  }

  update(denunciante: Denunciante) {
    const data = DenuncianteMapper.toPersist(denunciante);

    return ResultAsync.fromPromiseHttp(
      this.prismaService.denunciante.update({
        where: { id: denunciante.id },
        data,
      }),
    ).map((updated) => DenuncianteMapper.toDomain(updated));
  }

  findAll() {
    return ResultAsync.fromPromiseHttp(
      this.prismaService.denunciante.findMany(),
    ).map((denunciantes) =>
      denunciantes.map((denunciante) =>
        DenuncianteMapper.toDomain(denunciante),
      ),
    );
  }

  findOne(id: string) {
    return ResultAsync.fromPromiseHttp(
      this.prismaService.denunciante.findUnique({ where: { id } }),
    ).andThen((denunciante) => {
      if (!denunciante) {
        return fail(new HttpError('Denunciante not found', 404));
      }

      return success(DenuncianteMapper.toDomain(denunciante));
    });
  }

  remove(id: string) {
    return ResultAsync.fromPromiseHttp(
      this.prismaService.denunciante.delete({
        where: { id: id },
      }),
    ).map(() => null);
  }
}
